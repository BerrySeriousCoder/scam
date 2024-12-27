import {
  Typography,
  Input,
  Button,
  Card,
  Space,
  Row,
  Col,
  message,
  Spin,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function LinkedInOptimizerPage() {
  const { user } = useUserContext()
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const { data: existingProfile, refetch } =
    Api.linkedinProfile.findFirst.useQuery({
      where: { userId: user?.id },
    })

  const { mutateAsync: createProfile } =
    Api.linkedinProfile.create.useMutation()
  const { mutateAsync: updateProfile } =
    Api.linkedinProfile.update.useMutation()
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()
  const { mutateAsync: generatePdf } =
    Api.documentProcessor.htmlToPdf.useMutation()

  const handleAnalyzeProfile = async () => {
    try {
      setIsAnalyzing(true)

      const analysis = await generateText({
        prompt: `Analyze this LinkedIn profile: ${linkedInUrl}. Provide specific suggestions for improvement in these areas: 1. Profile Summary 2. Experience Description 3. Skills Section 4. Headline. Format the response in clear sections.`,
      })

      if (existingProfile) {
        await updateProfile({
          where: { id: existingProfile.id },
          data: {
            profileUrl: linkedInUrl,
            content: analysis.answer,
            score: '85',
            lastAnalysis: new Date().toISOString(),
            userId: user?.id,
          },
        })
      } else {
        await createProfile({
          data: {
            profileUrl: linkedInUrl,
            content: analysis.answer,
            score: '85',
            lastAnalysis: new Date().toISOString(),
            userId: user?.id,
          },
        })
      }

      await refetch()
      message.success('LinkedIn profile analyzed successfully!')
    } catch (error) {
      message.error('Failed to analyze LinkedIn profile')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownloadReport = async () => {
    try {
      if (!existingProfile?.content) return

      const htmlContent = `
        <html>
          <body>
            <h1>LinkedIn Profile Analysis Report</h1>
            <p>Profile URL: ${existingProfile.profileUrl}</p>
            <h2>Analysis Results</h2>
            ${existingProfile.content
              .split('\n')
              .map(line => `<p>${line}</p>`)
              .join('')}
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </body>
        </html>
      `

      const { url } = await generatePdf({ html: htmlContent })
      window.open(url, '_blank')
      message.success('Report downloaded successfully!')
    } catch (error) {
      message.error('Failed to download report')
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14}>
          <Space
            direction="vertical"
            size="large"
            style={{ width: '100%', padding: '24px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>
                <i className="las la-linkedin" /> LinkedIn Profile Optimizer
              </Title>
              <Paragraph>
                Enhance your professional presence with AI-powered LinkedIn
                profile analysis and recommendations.
              </Paragraph>
            </div>

            <Card>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <div>
                  <Text strong>Enter your LinkedIn Profile URL</Text>
                  <Input
                    prefix={<i className="las la-link" />}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    value={linkedInUrl}
                    onChange={e => setLinkedInUrl(e.target.value)}
                    style={{ marginTop: 8 }}
                  />
                </div>
                <Button
                  type="primary"
                  icon={<i className="las la-search" />}
                  onClick={handleAnalyzeProfile}
                  loading={isAnalyzing}
                  block
                >
                  Analyze Profile
                </Button>
              </Space>
            </Card>

            {existingProfile?.content && (
              <Card
                title={
                  <Space>
                    <i className="las la-chart-bar" />
                    <span>Analysis Results</span>
                  </Space>
                }
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <div>
                    <Text strong>Last Analysis:</Text>
                    <Text>
                      {' '}
                      {new Date(
                        existingProfile.lastAnalysis || '',
                      ).toLocaleDateString()}
                    </Text>
                  </div>
                  <Paragraph style={{ whiteSpace: 'pre-line' }}>
                    {existingProfile.content}
                  </Paragraph>
                  <Button
                    icon={<i className="las la-download" />}
                    onClick={handleDownloadReport}
                    block
                  >
                    Download PDF Report
                  </Button>
                </Space>
              </Card>
            )}
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
