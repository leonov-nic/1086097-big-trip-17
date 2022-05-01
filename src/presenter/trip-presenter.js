import {render} from '../render';
import { tripSortView } from '../view/trip-sort-view';
import { TripListView } from '../view/trip-list-view';
import { TripFormView } from '../view/trip-form-view';
import { TripEditFormView } from '../view/trip-edit-form-view';
import { TripView } from '../view/trip-view';

export class TripPresenter {
  tripListComponent = new TripListView();

  init = (tripContainer, tripsModel) => {
    this.tripContainer = tripContainer;
    this.tripsModel = tripsModel;
    this.trips = [...tripsModel.getTrips()];

    // console.log(this.trips);

    render(new tripSortView, this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new TripEditFormView(), this.tripListComponent.getElement());
    render(new TripFormView(), this.tripListComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new TripView(), this.tripListComponent.getElement());
    // }

    for (let i = 0; i < this.trips.length; i++) {
      render(new TripView(this.trips[i]), this.tripListComponent.getElement());
    }

  };
}
