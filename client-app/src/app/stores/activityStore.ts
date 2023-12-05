import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this)
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  loadActivities = async () => {
    this.setLoadingInitial(true)
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        this.activities.push(activity);
      })
      this.setLoadingInitial(false)

    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false)
    }
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id)
  }

  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectActivity();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createActivity = async (acticity: Activity) => {
    this.loading = true;
    acticity.id = uuid();
    try {
      await agent.Activities.create(acticity);
      runInAction(() => {
        this.activities.push(acticity);
        this.selectedActivity = acticity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  updateActivity = async (acticity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(acticity);
      runInAction(() => {
        // this.activities.filter(a => a.id !== acticity.id)
        // this.activities.push(acticity);
        this.activities = [...this.activities.filter(a => a.id !== acticity.id), acticity] // same result as the above two lines
        this.selectedActivity = acticity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activities = [...this.activities.filter(a => a.id !== id)];
        if (this.selectedActivity?.id === id) this.cancelSelectActivity()
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }
}