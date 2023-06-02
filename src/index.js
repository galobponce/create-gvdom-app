import { gvdom, createElement } from "gvdom"

const Title = ({ text }) => {
  return (
    <h1 class="title" onClick={() => console.log("Hello World!")}>
      {text}
    </h1>
  )
}

document
  .getElementById("app")
  .appendChild(createElement(<Title text="My First Gvdom App" />))
