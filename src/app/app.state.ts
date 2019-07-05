import {ProductState} from "./goods/state/goods.reducer";
import {UserState} from "./user/state/user.reducer";

export interface State {
  products: ProductState;
  user: UserState;
}
