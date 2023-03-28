import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { Configuration, OpenAIApi } from "openai";
import { useParams } from "react-router-dom";

const Search = () => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const req = params.text;
  const f = async () => {
    setLoading(true);

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req }],
    });
    setAnswer(completion?.data?.choices[0]?.message?.content);
    setLoading(false);
  };
  useEffect(() => {
    f();
  }, []);
  return (
    <Layout>
      <h1 className="m-3">{req.toLocaleUpperCase()}</h1>
      <div
        className="container mx-auto d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <h6 className="w-50 mx-auto">{loading ? "Loading..." : answer}</h6>
      </div>
    </Layout>
  );
};

export default Search;
