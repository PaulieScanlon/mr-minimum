import React from 'react';
import { graphql } from 'gatsby';

const Page = ({ data, serverData }) => {
  const {
    site: {
      siteMetadata: { title, description }
    }
  } = data;

  const { name, job_title, company } = serverData;

  return (
    <main
      style={{
        display: 'grid',
        gridGap: '16px'
      }}
    >
      <div
        style={{
          border: '1px solid red'
        }}
      >
        <small>SSG = data</small>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div
        style={{
          border: '1px solid blue'
        }}
      >
        <small>SSR = serverData</small>
        <h2>{name}</h2>
        <p>{job_title}</p>
        <p>{company}</p>
      </div>
    </main>
  );
};

export async function getServerData() {
  const response = await fetch(
    'https://paulieapi.gatsbyjs.io/api/get-test-data'
  );

  const {
    data: { name, job_title, company }
  } = await response.json();

  return {
    props: {
      name: name,
      job_title: job_title,
      company: company
    }
  };
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default Page;
