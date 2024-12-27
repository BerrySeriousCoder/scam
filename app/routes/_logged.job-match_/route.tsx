import {
  Typography,
  Input,
  Card,
  Row,
  Col,
  Button,
  Progress,
  List,
  Spin,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function JobMatchPage() {
  const { user } = useUserContext()
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Fetch user's latest resume
  const { data: documents, isLoading: isLoadingDocuments } =
    Api.document.findMany.useQuery({
      where: {
        userId: user?.id,
        type: 'RESUME',
      },
      orderBy: { createdAt: 'desc' },
      take: 1,
    })

  // Mutations
  const { mutateAsync: createJobMatch } = Api.jobMatch.create.useMutation()
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const analyzeJob = async () => {
    if (!documents?.[0]) {
      message.error('Please upload a resume first')
      return
    }

    if (!jobDescription) {
      message.error('Please paste a job description')
      return
    }

    setIsAnalyzing(true)
    try {
      // Generate match analysis
      const matchAnalysis = await generateText({
        prompt: `Analyze this job description against the resume and provide: 
        1. Match score (0-100)
        2. Key matching keywords
        3. Missing skills
        4. Suggestions for improvement
        Job Description: ${jobDescription}
        Resume Content: ${documents[0].content}`,
      })

      // Create job match record
      await createJobMatch({
        data: {
          jobDescription,
          matchScore: matchAnalysis.answer.match(/\d+/)?.[0] || '0',
          status: 'COMPLETED',
          userId: user?.id,
          documentId: documents[0].id,
        },
      })

      // Generate cover letter
      const coverLetter = await generateText({
        prompt: `Generate a professional cover letter based on this job description and resume:
        Job Description: ${jobDescription}
        Resume: ${documents[0].content}`,
      })

      // Generate suggested job titles
      const jobTitles = await generateText({
        prompt: `Based on the resume skills and experience, suggest 5 relevant job titles:
        Resume: ${documents[0].content}`,
      })

      setAnalysisResults({
        analysis: matchAnalysis.answer,
        coverLetter: coverLetter.answer,
        suggestedTitles: jobTitles.answer,
      })
    } catch (error) {
      message.error('Analysis failed. Please try again.')
    }
    setIsAnalyzing(false)
  }

  const [analysisResults, setAnalysisResults] = useState<{
    analysis: string
    coverLetter: string
    suggestedTitles: string
  } | null>(null)

  if (isLoadingDocuments) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-briefcase" style={{ marginRight: 8 }} />
          Job Match Analysis
        </Title>
        <Paragraph>
          Paste a job description below to compare it with your resume and
          receive personalized insights.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <i className="las la-paste" style={{ marginRight: 8 }} />
                  Job Description
                </span>
              }
            >
              <TextArea
                rows={10}
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
              />
              <Button
                type="primary"
                onClick={analyzeJob}
                loading={isAnalyzing}
                style={{ marginTop: 16 }}
                icon={<i className="las la-search" />}
              >
                Analyze Match
              </Button>
            </Card>
          </Col>

          {analysisResults && (
            <Col xs={24} lg={12}>
              <Card
                title={
                  <span>
                    <i
                      className="las la-chart-bar"
                      style={{ marginRight: 8 }}
                    />
                    Analysis Results
                  </span>
                }
              >
                <Paragraph>{analysisResults.analysis}</Paragraph>

                <Title level={4}>
                  <i className="las la-file-alt" style={{ marginRight: 8 }} />
                  Generated Cover Letter
                </Title>
                <Paragraph>{analysisResults.coverLetter}</Paragraph>

                <Title level={4}>
                  <i className="las la-tags" style={{ marginRight: 8 }} />
                  Suggested Job Titles
                </Title>
                <Paragraph>{analysisResults.suggestedTitles}</Paragraph>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </PageLayout>
  )
}
