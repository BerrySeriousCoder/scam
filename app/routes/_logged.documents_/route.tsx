import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Select,
  Modal,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentsPage() {
  const { user } = useUserContext()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [translating, setTranslating] = useState(false)

  // Fetch user's documents with job matches included
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    where: { userId: user?.id },
    include: { jobMatchs: true },
    orderBy: { updatedAt: 'desc' },
  })

  // Mutations
  const { mutateAsync: duplicateDoc } = Api.document.create.useMutation()
  const { mutateAsync: updateDoc } = Api.document.update.useMutation()
  const { mutateAsync: translateText } = Api.ai.generateText.useMutation()

  // Handle document duplication
  const handleDuplicate = async (doc: any) => {
    try {
      await duplicateDoc({
        data: {
          title: `${doc.title} (Copy)`,
          content: doc.content,
          type: doc.type,
          format: doc.format,
          language: doc.language,
          industryType: doc.industryType,
          version: doc.version,
          userId: user?.id,
        },
      })
      message.success('Document duplicated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to duplicate document')
    }
  }

  // Handle document translation
  const handleTranslate = async (doc: any) => {
    setTranslating(true)
    try {
      const prompt = `Translate the following text to ${selectedLanguage}:\n\n${doc.content}`
      const { answer } = await translateText({ prompt })

      await updateDoc({
        where: { id: doc.id },
        data: {
          content: answer,
          language: selectedLanguage,
        },
      })

      message.success('Document translated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to translate document')
    }
    setTranslating(false)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-file-alt" style={{ marginRight: '8px' }}></i>
          My Documents
        </Title>
        <Text type="secondary">
          Manage your resumes and cover letters, organize them by job
          applications, and translate them into different languages.
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          {documents?.map(doc => (
            <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i
                      className={`las ${
                        doc.type === 'resume' ? 'la-file' : 'la-envelope'
                      }`}
                      style={{ marginRight: '8px' }}
                    ></i>
                    {doc.title}
                  </div>
                }
                extra={
                  <Text type="secondary">
                    {dayjs(doc.updatedAt).format('MMM D, YYYY')}
                  </Text>
                }
                actions={[
                  <Button
                    type="text"
                    icon={<i className="las la-copy"></i>}
                    onClick={() => handleDuplicate(doc)}
                  >
                    Duplicate
                  </Button>,
                  <Button
                    type="text"
                    icon={<i className="las la-language"></i>}
                    onClick={() =>
                      Modal.confirm({
                        title: 'Translate Document',
                        content: (
                          <Select
                            style={{ width: '100%' }}
                            value={selectedLanguage}
                            onChange={setSelectedLanguage}
                            options={[
                              { value: 'en', label: 'English' },
                              { value: 'es', label: 'Spanish' },
                              { value: 'fr', label: 'French' },
                              { value: 'de', label: 'German' },
                            ]}
                          />
                        ),
                        onOk: () => handleTranslate(doc),
                        okButtonProps: { loading: translating },
                      })
                    }
                  >
                    Translate
                  </Button>,
                ]}
              >
                <Text strong>Type:</Text> <Text>{doc.type}</Text>
                <br />
                <Text strong>Language:</Text> <Text>{doc.language}</Text>
                <br />
                {doc.jobMatchs && doc.jobMatchs.length > 0 && (
                  <>
                    <Text strong>Job Applications:</Text>
                    <br />
                    {doc.jobMatchs.map((match: any) => (
                      <Tag key={match.id} color="blue">
                        {match.jobTitle}
                      </Tag>
                    ))}
                  </>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
