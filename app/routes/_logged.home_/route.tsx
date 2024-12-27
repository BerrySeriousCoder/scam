import { Typography, Card, Row, Col, Progress, Button, List, Tag } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user } = useUserContext()

  // Fetch user's documents
  const { data: documents } = Api.document.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  })

  // Fetch user's job matches
  const { data: jobMatches } = Api.jobMatch.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { updatedAt: 'desc' },
    take: 3,
  })

  // Fetch user's LinkedIn profile
  const { data: linkedinProfile } = Api.linkedinProfile.findFirst.useQuery({
    where: { userId: user?.id },
  })

  // Fetch user's career path
  const { data: careerPath } = Api.careerPath.findFirst.useQuery({
    where: { userId: user?.id },
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tachometer-alt"></i> My Career Dashboard
        </Title>
        <Text type="secondary">
          Track your career progress and optimize your professional presence
        </Text>

        {/* Score Overview */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>
                <i className="las la-file-alt"></i> Resume Score
              </Title>
              <Progress
                type="circle"
                percent={parseInt(documents?.[0]?.score || '0')}
                format={percent => `${percent}%`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>
                <i className="las la-linkedin"></i> LinkedIn Score
              </Title>
              <Progress
                type="circle"
                percent={parseInt(linkedinProfile?.score || '0')}
                format={percent => `${percent}%`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>
                <i className="las la-chart-line"></i> Career Progress
              </Title>
              <Progress
                type="circle"
                percent={parseInt(careerPath?.progress || '0')}
                format={percent => `${percent}%`}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card style={{ marginTop: 24 }}>
          <Title level={4}>
            <i className="las la-bolt"></i> Quick Actions
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Button type="primary" block href="/resume-editor">
                <i className="las la-edit"></i> Edit Resume
              </Button>
            </Col>
            <Col xs={24} sm={8}>
              <Button type="primary" block href="/linkedin-optimizer">
                <i className="las la-linkedin"></i> Optimize LinkedIn
              </Button>
            </Col>
            <Col xs={24} sm={8}>
              <Button type="primary" block href="/job-match">
                <i className="las la-search"></i> Find Job Matches
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Recent Documents */}
        <Card style={{ marginTop: 24 }}>
          <Title level={4}>
            <i className="las la-file"></i> Recent Documents
          </Title>
          <List
            dataSource={documents}
            renderItem={doc => (
              <List.Item
                actions={[
                  <Tag color="blue">{doc.type}</Tag>,
                  <Tag color="green">Score: {doc.score}%</Tag>,
                ]}
              >
                <List.Item.Meta
                  title={doc.title}
                  description={`Last updated: ${dayjs(doc.updatedAt).format(
                    'MMM D, YYYY',
                  )}`}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Job Applications */}
        <Card style={{ marginTop: 24 }}>
          <Title level={4}>
            <i className="las la-briefcase"></i> Recent Job Matches
          </Title>
          <List
            dataSource={jobMatches}
            renderItem={match => (
              <List.Item
                actions={[
                  <Tag color={match.status === 'MATCHED' ? 'green' : 'orange'}>
                    {match.status}
                  </Tag>,
                ]}
              >
                <List.Item.Meta
                  title={match.jobTitle}
                  description={`Match Score: ${match.matchScore}%`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
