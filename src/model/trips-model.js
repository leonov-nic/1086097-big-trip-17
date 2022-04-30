import { generateTrip } from '../fish/trip';

export default class TripsModel {
  tasks = Array.from({length: 5}, generateTrip);

  getTasks = () => this.tasks;
}
