import { Link } from "react-router-dom";

export function MainPage() {
  return <div>Main Page
    <div><Link to="/">Main</Link></div>
    <div><Link to="/auth">Authorization</Link></div>
    <div><Link to="/games/sprint">Sprint</Link></div>
    <div><Link to="/games/audiocall">Audiocall</Link></div>
    <div><Link to="/textbook">Textbook</Link></div>
    <div><Link to="/statistics">Statistics</Link></div>
  </div>

}