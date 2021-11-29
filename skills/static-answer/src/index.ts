import {skill} from "../../../core/src/mqtt";
import {StaticAnswerHandler} from "./handler";

skill(['StaticAnswer'], new StaticAnswerHandler())