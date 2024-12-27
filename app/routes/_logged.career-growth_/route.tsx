import { Typography, Card, Row, Col, Progress, List, Spin, Empty } from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CareerGrowthPage() {
  const { user } = useUserContext()
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  // Fetch career paths for the current user
  const { data: careerPaths, isLoading: isLoadingPaths } =
    Api.careerPath.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    })

  // Generate industry tips using AI
  const generateTips = Api.ai.generateText.useMutation()
  const [tips, setTips] = useState<string[]>([])

  const handleGetTips = async (role: string) => {
    setSelectedPath(role)
    const prompt = `Give me 3 professional advancement tips for someone working as a ${role}. Format as bullet points.`
    const response = await generateTips.mutateAsync({ prompt })
    const tipsList = response.answer
      .split('\n')
      .filter(tip => tip.trim().startsWith('•'))
    setTips(tipsList)
  }

  if (isLoadingPaths) {
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
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={2}>
            <i
              className="las la-chart-line"
              style={{ marginRight: '10px' }}
            ></i>
            Career Growth Dashboard
          </Title>
          <Paragraph>
            Track your career progression, analyze skill gaps, and get
            personalized advancement tips
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <i
                    className="las la-route"
                    style={{ marginRight: '10px' }}
                  ></i>
                  Career Progression Paths
                </span>
              }
              bordered={false}
            >
              {careerPaths?.length ? (
                careerPaths.map(path => (
                  <div key={path.id} style={{ marginBottom: '20px' }}>
                    <Card.Grid
                      style={{ width: '100%', cursor: 'pointer' }}
                      onClick={() => handleGetTips(path.targetRole || '')}
                    >
                      <Text strong>
                        {path.currentRole} → {path.targetRole}
                      </Text>
                      <Progress
                        percent={parseInt(path.progress || '0')}
                        status="active"
                        strokeColor={{ from: '#108ee9', to: '#87d068' }}
                      />
                      <div style={{ marginTop: '10px' }}>
                        <Text type="secondary">Required Skills:</Text>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginTop: '5px',
                          }}
                        >
                          {path.requiredSkills
                            ?.split(',')
                            .map((skill, index) => (
                              <Text
                                key={index}
                                style={{
                                  background: '#f0f2f5',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                {skill.trim()}
                              </Text>
                            ))}
                        </div>
                      </div>
                    </Card.Grid>
                  </div>
                ))
              ) : (
                <Empty description="No career paths found" />
              )}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <i
                    className="las la-lightbulb"
                    style={{ marginRight: '10px' }}
                  ></i>
                  Industry Advancement Tips
                </span>
              }
              bordered={false}
            >
              {selectedPath ? (
                <>
                  <Title level={4}>Tips for {selectedPath}</Title>
                  <List
                    dataSource={tips}
                    renderItem={tip => (
                      <List.Item>
                        <Text>{tip}</Text>
                      </List.Item>
                    )}
                    loading={generateTips.isLoading}
                  />
                </>
              ) : (
                <Empty description="Select a career path to see relevant tips" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
