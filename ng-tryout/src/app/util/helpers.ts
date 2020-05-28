import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export const createSubscription = (route: string): Observable<any> => {
  return new Observable(observer => {
    const evtSource = new EventSource(`${environment.API_URL}/${route}`);
    evtSource.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      console.log(data);
      observer.next(data);
    });
  });
};
