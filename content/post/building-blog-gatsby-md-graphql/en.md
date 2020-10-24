---
title: Building a static blog with Gatsby, Markdown and GraphQL
date: 2020-10-20T10:17:49.967Z
description:
tags:
  - react
  - gatsby
  - typescript
draft: true
---

Just like many other developers do so, as soon as I started writing frontend and backend web applications I desired to have a blog of my own. There are plenty of blog platforms like Jekyll, Medium, or Tistory, Velog, which is commin in Korea. However, I wanted to build my blog from scratch, maybe because I want to be a professional frontend developer who can manage & maintain his own blog. I digged into writing the code recently because I felt that the ecosystem of Gatsby framework has become very mature. Compared to last year, not only the Gatsby plugins but also my React experience was improved a lot. It has been an entertainment for me attaching plugins and writing codes since I first deployed this blog.

# Gatsby: Static sites built on React

Gatsby is a React framework that is useful to generate static pages like landing pages or blog. There are three major React frameworks(at least in my mind): create-react-app(CRA), Next and Gatsby; Gatsby is especially utilized for static page generation. Is blog a static page? It may be not, in terms of blog platforms that support authentication, writing posts by an authenticated author, saving or editing the posts. It may be, however, if a single authority writes posts, no authentication is needed, no database, resulting no need for a backend. It is also better in performance to serve pages static because it does not involve any additional fetching of data. Jekyll is a very widely used ruby based static blog framework[^1]. And some Gatsby plugins seem to be inspired of Jekyll's structure.

## GraphQL

Gatsby collects every data on build time; it collects data from various sources and create pages using internal APIs. Data is stored in JS objects but it isn't directly exposed. Instead, GraphQL is used to query data from the data pool. A typical JSON static file data can be read by Gatsby and queried in page creation APIs to generate a page populated with that data. GraphQL was created as a client-server query language that can substitute REST API, so it is much more than what we need to know to build a Gatsby site. Many simple blog starters implement queries that fetch article data, but as the codebase gets more complicated there are lot of chances to modify or write new GraphQL queries. The current article, also current website, was heavily inspired by [this starter](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/).

## Markdown

There are plenty of ways to make a structured document from plain text data. The best, for the browser, is of course HTML, but it is too verbose for humans. Developers typically love a format called markdown. Not only because it is supported by GitHub and many IT giants, but markdown has very simple and human-readable structure. Most syntaxes are in one-to-one relation with an HTML tag but there are little visual difference when markdown is expressed as plain text or parsed HTML.

### MDX?

Markdown concentrates on expressing text data, so it is inappropriate to express various HTML tags. To overcome this markdown allows using HTML tags inside the document. MDX is a combination of MarkDown & JSX. It uses this syntax not for HTML tags but React JSX components, which allows more rich and dynamic data in the document. I am currently worried of some collisions that may happen between MDX parser and markdown processor remark, so I'm not using this for now. But I am willing to implement this in near future.

## Gatsby plugins

[^1]: [GitHub pages](https://pages.github.com), aka github.io supports Jekyll very well, and many github.io blogs are implemented on it.
