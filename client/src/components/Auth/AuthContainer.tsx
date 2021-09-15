import {connect} from "react-redux";
import Auth from "./Auth";
import {signIn, signUp} from "../../Store/reducer";


export default connect(null, {signUp, signIn})(Auth)