import { Formik } from 'formik'
import { Button, Form} from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';

interface Props{
  setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm = ({setEditMode}:Props) => {
  const { profileStore: { profile, updateProfile } } = useStore();

  return (
    <Formik
      enableReinitialize
      initialValues={profile!}
      onSubmit={values => {
        updateProfile(values)
          .then(() => setEditMode(false));
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required('The display name is required'),
      })}>
      {({isSubmitting, isValid, dirty, handleSubmit }) => (
        <Form className="ui form" onSubmit={handleSubmit}>
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="bio" placeholder="Add your bio" rows={3} />
          <Button
            disabled={!isValid || !dirty}
            loading={isSubmitting}
            positive
            content='Update profile'
            type="submit"
            floated='right'
          />
        </Form>
      )}
    </Formik>
  )
}

export default observer(ProfileEditForm) 