import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "./ArticlePage.scss";

function ArticlePage() {
  const [value, setValue] = React.useState<any>("**Hello world!!!**");
  return (
    <section className="article-page">
      <MDEditor value={value} onChange={setValue} />
      {/*<MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />*/}
    </section>
  );
}

export default ArticlePage;
