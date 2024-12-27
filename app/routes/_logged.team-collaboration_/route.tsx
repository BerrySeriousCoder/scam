import {
  Typography,
  Table,
  Button,
  Modal,
  Select,
  message,
  Space,
  Card,
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

export default function TeamCollaborationPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<string>('')
  const [selectedCollaborator, setSelectedCollaborator] = useState<string>('')
  const [selectedPermission, setSelectedPermission] = useState<string>('VIEW')

  // Fetch documents owned by the user
  const { data: documents } = Api.document.findMany.useQuery({
    where: { userId: user?.id },
    include: { collaborations: { include: { collaborator: true } } },
  })

  // Fetch documents shared with the user
  const { data: sharedDocuments } = Api.document.findMany.useQuery({
    where: { collaborations: { some: { collaboratorId: user?.id } } },
    include: {
      user: true,
      collaborations: { include: { collaborator: true } },
    },
  })

  // Fetch all users for collaboration
  const { data: users } = Api.user.findMany.useQuery({
    where: { NOT: { id: user?.id } },
  })

  // Mutation to create collaboration
  const { mutateAsync: createCollaboration } =
    Api.collaboration.create.useMutation()

  const handleShare = async () => {
    try {
      await createCollaboration({
        data: {
          documentId: selectedDocument,
          collaboratorId: selectedCollaborator,
          userId: user?.id,
          permission: selectedPermission,
        },
      })
      message.success('Document shared successfully')
      setIsModalOpen(false)
    } catch (error) {
      message.error('Failed to share document')
    }
  }

  const columns = [
    {
      title: 'Document Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY'),
    },
    {
      title: 'Collaborators',
      dataIndex: 'collaborations',
      key: 'collaborations',
      render: (collaborations: any[]) => (
        <Space>
          {collaborations?.map(collab => (
            <Text key={collab.id}>
              <i className="las la-user"></i>{' '}
              {collab.collaborator?.name || collab.collaborator?.email}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/resume-editor?id=${record.id}`)}
            icon={<i className="las la-edit"></i>}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setSelectedDocument(record.id)
              setIsModalOpen(true)
            }}
            icon={<i className="las la-share"></i>}
          >
            Share
          </Button>
        </Space>
      ),
    },
  ]

  const sharedColumns = [
    {
      title: 'Document Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Owner',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => <Text>{user?.name || user?.email}</Text>,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="primary"
          onClick={() => navigate(`/resume-editor?id=${record.id}`)}
          icon={<i className="las la-eye"></i>}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-users"></i> Team Collaboration
        </Title>
        <Text type="secondary">
          Share your documents with team members and track their changes in
          real-time.
        </Text>

        <Card title="My Documents" style={{ marginTop: 24 }}>
          <Table dataSource={documents} columns={columns} rowKey="id" />
        </Card>

        <Card title="Shared With Me" style={{ marginTop: 24 }}>
          <Table
            dataSource={sharedDocuments}
            columns={sharedColumns}
            rowKey="id"
          />
        </Card>

        <Modal
          title="Share Document"
          open={isModalOpen}
          onOk={handleShare}
          onCancel={() => setIsModalOpen(false)}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select collaborator"
              onChange={value => setSelectedCollaborator(value)}
            >
              {users?.map(user => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name || user.email}
                </Select.Option>
              ))}
            </Select>

            <Select
              style={{ width: '100%' }}
              placeholder="Select permission"
              value={selectedPermission}
              onChange={value => setSelectedPermission(value)}
            >
              <Select.Option value="VIEW">View Only</Select.Option>
              <Select.Option value="EDIT">Can Edit</Select.Option>
            </Select>
          </Space>
        </Modal>
      </div>
    </PageLayout>
  )
}
