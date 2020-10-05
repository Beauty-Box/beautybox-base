import { Provider } from '@beautybox/entity/Provider';

export class Bids extends Provider {
    constructor() {
        super();
        this.coming = [];
        this.past = [];
        this.today = [];
        this.tomorrow = [];
    }
}
