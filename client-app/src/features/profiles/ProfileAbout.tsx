import { Button, Grid, Header, Tab } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import { Profile } from "../../app/models/profile";

interface Props {
  profile: Profile
}

const ProfileAbout = ({ profile }: Props) => {
  const { profileStore: { isCurrentUser } } = useStore();
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon={'user circle'} content={`About ${profile.displayName}`} floated='left' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default ProfileAbout