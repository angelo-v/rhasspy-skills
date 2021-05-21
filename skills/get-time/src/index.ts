import {skill} from "../../../core/src/mqtt";
import {GetCurrentTime} from "./handler";


skill(['GetTime'], new GetCurrentTime());