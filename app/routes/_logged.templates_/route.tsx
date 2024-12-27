import { Typography, Card, Row, Col, Button, Spin, message } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Fetch all available templates
  const { data: templates, isLoading } = Api.template.findMany.useQuery({
    where: {
      type: 'RESUME',
    },
  })

  // Preview template mutation
  const { mutateAsync: generatePdf } =
    Api.documentProcessor.htmlToPdf.useMutation()

  const handlePreview = async (templateId: string) => {
    try {
      setSelectedTemplate(templateId)
      const template = templates?.find(t => t.id === templateId)

      if (template?.content) {
        const { url } = await generatePdf({
          html: template.content,
        })

        // Open preview in new tab
        window.open(url, '_blank')
      }
    } catch (error) {
      message.error('Failed to generate preview')
    } finally {
      setSelectedTemplate(null)
    }
  }

  const handleSelect = (templateId: string) => {
    navigate(`/resume-editor?templateId=${templateId}`)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2}>
            <i className="las la-file-alt" style={{ marginRight: 8 }}></i>
            Professional Resume Templates
          </Title>
          <Text>
            Choose from our collection of ATS-friendly resume templates and
            create your perfect resume
          </Text>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {templates?.map(template => (
              <Col xs={24} sm={12} md={8} lg={6} key={template.id}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: 200,
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <i
                        className="las la-file-alt"
                        style={{ fontSize: 48, color: '#999' }}
                      ></i>
                    </div>
                  }
                  actions={[
                    <Button
                      key="preview"
                      type="link"
                      icon={<i className="las la-eye"></i>}
                      loading={selectedTemplate === template.id}
                      onClick={() => handlePreview(template.id)}
                    >
                      Preview
                    </Button>,
                    <Button
                      key="select"
                      type="link"
                      icon={<i className="las la-check"></i>}
                      onClick={() => handleSelect(template.id)}
                    >
                      Select
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={template.name || 'Untitled Template'}
                    description={
                      <div>
                        {template.isAts && (
                          <Text type="success">
                            <i
                              className="las la-check-circle"
                              style={{ marginRight: 4 }}
                            ></i>
                            ATS Friendly
                          </Text>
                        )}
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {templates?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="secondary">No templates available</Text>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
