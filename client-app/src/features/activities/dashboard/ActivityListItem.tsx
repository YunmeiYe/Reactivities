import { SyntheticEvent, useState } from 'react'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { Link } from 'react-router-dom'
import { useStore } from '../../../app/stores/store'
import { format } from 'date-fns'

interface Props {
  activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  const [target, setTarget] = useState('');

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by Bob
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />{format(activity.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{activity.venue}
          <Icon name='book'/> {activity.category}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>
          {activity.description}
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            color='teal'
            floated='right'
            content='View'
          />
            <Button
            name={activity.id}
            loading={loading && target === activity.id}
            onClick={(e) => handleActivityDelete(e, activity.id)}
            floated="right"
            content="Delete"
            color="red" />
        </span>
      </Segment>
    </Segment.Group>
  )
}

export default ActivityListItem