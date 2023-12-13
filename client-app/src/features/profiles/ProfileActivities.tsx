import { Card, Grid, Header, Tab, Image, TabProps } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";

const panes = [
  { menuItem: 'Future Events', pane: { key: 'future' } },
  { menuItem: 'Past Events', pane: { key: 'past' } },
  { menuItem: 'Hosting', pane: { key: 'hosting' } },
]

const ProfileActivities = () => {
  const { profileStore } = useStore();
  const { profile, userActivities, loadUserActivities, loadingActivities } = profileStore;

  useEffect(() => {
    loadUserActivities(profile!.username)
  }, [loadUserActivities, profile]);

  function handleTabChange(e: SyntheticEvent, data: TabProps) {
    loadUserActivities(profile!.username, panes[data.activeIndex as number].pane.key)
  }

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header icon={'calendar'} content={`Activities`} floated='left' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
        {userActivities.map((activity) => (
          <Card as={Link} to={`/activities/${activity.id}`} key={activity.id}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} style={{ minHeight: 100, objectFit: 'cover' }}/>
            <Card.Content>
              <Card.Header textAlign='center'>{activity.title}</Card.Header>
              <Card.Meta textAlign='center'>
                {activity.date.toString()}
              </Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfileActivities) 