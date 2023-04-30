import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "./ArticlePage.scss";

function ArticlePage() {
  const [value, setValue] = React.useState<any>("**Hello world!!!**");
  console.log(value);
  return (
    <section className="article-page">
      <MDEditor value={value} onChange={setValue} minHeight={300} />
      {/*<MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />*/}
    </section>
  );
}

export default ArticlePage;
