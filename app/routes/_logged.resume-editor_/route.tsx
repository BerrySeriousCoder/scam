import {
  Typography,
  Button,
  Upload,
  Select,
  Card,
  Space,
  Spin,
  message,
} from 'antd'
import { useState } from 'react'
import type { UploadFile } from 'antd/es/upload/interface'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ResumeEditorPage() {
  const { user } = useUserContext()
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [currentVersion, setCurrentVersion] = useState<number>(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch user's documents
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { updatedAt: 'desc' },
  })

  // Create document mutation
  const { mutateAsync: createDocument } = Api.document.create.useMutation()

  // Update document mutation
  const { mutateAsync: updateDocument } = Api.document.update.useMutation()

  // AI assistance mutation
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const handleFileUpload = async (file: UploadFile) => {
    try {
      setIsAnalyzing(true)
      const { url } = await upload({ file: file as unknown as File })

      // Parse document content
      const { mutateAsync: parseDocument } =
        Api.documentProcessor.parseDocument.useMutation()
      const { content } = await parseDocument({ url })

      // Create new document
      await createDocument({
        data: {
          title: file.name,
          content,
          type: 'RESUME',
          format: file.type,
          version: 1.0,
          industryType: selectedIndustry,
          userId: user?.id,
        },
      })

      message.success('Resume uploaded and analyzed successfully!')
      refetch()
    } catch (error) {
      message.error('Error processing resume')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAIAssistance = async (documentId: string) => {
    try {
      const doc = documents?.find(d => d.id === documentId)
      if (!doc?.content) return

      const prompt = `Analyze this resume and provide improvement suggestions: ${doc.content}`
      const { answer } = await generateText({ prompt })

      await updateDocument({
        where: { id: documentId },
        data: {
          content: answer,
          version: currentVersion + 0.1,
        },
      })

      setCurrentVersion(prev => prev + 0.1)
      message.success('AI suggestions applied successfully!')
      refetch()
    } catch (error) {
      message.error('Error getting AI assistance')
    }
  }

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-file-alt" /> Resume Editor
        </Title>
        <Paragraph>
          Create, edit, and optimize your resume with AI assistance. Get
          real-time suggestions and make your resume stand out.
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Select
                style={{ width: 200 }}
                placeholder="Select Industry"
                onChange={value => setSelectedIndustry(value)}
                options={industries.map(i => ({ label: i, value: i }))}
              />

              <Upload.Dragger
                accept=".pdf,.doc,.docx"
                beforeUpload={file => {
                  handleFileUpload(file)
                  return false
                }}
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <i
                    className="las la-cloud-upload-alt"
                    style={{ fontSize: 48 }}
                  />
                </p>
                <p className="ant-upload-text">
                  Click or drag your resume to analyze
                </p>
              </Upload.Dragger>
            </Space>
          </Card>

          {isAnalyzing && (
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" />
              <Text>Analyzing your resume...</Text>
            </div>
          )}

          {documents?.map(doc => (
            <Card key={doc.id} style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                  <i className="las la-file-pdf" />
                  <Text strong>{doc.title}</Text>
                  <Text type="secondary">Version {doc.version}</Text>
                </Space>

                <Space wrap>
                  <Button
                    type="primary"
                    icon={<i className="las la-magic" />}
                    onClick={() => handleAIAssistance(doc.id)}
                  >
                    Get AI Suggestions
                  </Button>
                  <Button
                    icon={<i className="las la-download" />}
                    onClick={async () => {
                      const { mutateAsync: generatePdf } =
                        Api.documentProcessor.htmlToPdf.useMutation()
                      const { url } = await generatePdf({
                        html: doc.content || '',
                      })
                      window.open(url, '_blank')
                    }}
                  >
                    Download ATS Version
                  </Button>
                </Space>
              </Space>
            </Card>
          ))}
        </Space>
      </div>
    </PageLayout>
  )
}
