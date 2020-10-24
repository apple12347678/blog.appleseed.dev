---
title: Gatsby, Markdown, GraphQL로 정적 블로그 만들기
date: 2020-10-20T10:17:49.967Z
description: scratch부터 정적 블로그를 만드는 법
tags:
  - react
  - gatsby
  - typescript
---

많은 개발자들이 그랬듯 나도 프론트엔드와 백엔드를 어느 정도 다룰 수 있게 된 후부터 나만의 블로그를 가지고 싶다는 생각이 많이 들었다. Tistory, Jekyll, Medium, Velog 등 완성도 높고 다양한 플랫폼이 있지만 나름 프론트 개발자로서 처음부터 끝까지 스스로 만들어보고 싶어서 계속 미루고 있다가, Gatsby 프레임워크의 생태계가 최근에야 완성되었다는 생각이 들어 만들어보기로 결심했다. 작년보다 플러그인들의 상태가 좋아졌을 뿐만 아니라 스스로 React 숙련도가 많이 늘은 것 같다는 느낌이 들었다. 요즘은 블로그에 이것저것 플러그인 달고 배포하고 글 쓰는게 삶의 즐거움이 됐다.

# Gatsby: React로 만드는 정적 웹페이지

Gatsby는 React로 랜딩 페이지, 블로그 등 정적인 사이트를 만들 때 유용한 프레임워크다. React를 활용한 프레임워크라 할 만한 물건은 크게 create-react-app(CRA), next, gatsby 등이 있는데 gatsby는 특히 정적 사이트 생성에 특화되어 있다. 블로그가 정적 페이지인가? 생각해보면 로그인, 각 계정으로 글 수정, 저장 등을 지원하는 블로그 플랫폼들이 많다. 하지만 나만 쓰는 블로그고 글을 쓰기 위해 별도의 인증을 하지 않고 정적 파일의 형태로 제공하면 백엔드를 둘 필요가 없다. 퍼포먼스 면에서도 글을 보기 위해 별도의 API를 호출하는 것보다 훨씬 좋다. Jekyll은 널리 쓰이는 ruby 기반 정적 블로그 프레임워크인데[^1] gatsby의 여러 플러그인들이 Jekyll의 구조에서 영향을 받은 모습이 곳곳에서 보인다.

## GraphQL

Gatsby는 빌드 타임에 다양한 방법으로 데이터를 끌어모아 내부 API로 페이지를 생성한다. 데이터는 JS 객체들로 저장되지만 이것을 가져다 쓸 때는 GraphQL을 사용한다. 예를 들면, 파일 시스템에서 어떤 JSON 파일을 읽어 와서 데이터 풀에 저장한 다음 파일명 등으로 쿼리하여 그 데이터를 페이지에 담아내는 식이다. GraphQL의 스펙은 애초에 REST API를 대체하기 위한 클라이언트-서버간 쿼리 언어로서 개발되었기 때문에 Gatsby 내에서만 사용하는데 굳이 깊은 이해를 요구하지 않는다. 기본적인 블로그의 경우 잘 나와있는 starter들이 쿼리를 전부 구현해뒀기 때문에 그걸 가져다 쓰면 되지만, 검색, 번역, 태깅 등 데이터 조작을 필요로 할 수록 GraphQL을 다룰 일이 많아진다. 본 글의 내용과 사이트의 코드도 [해당 starter](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/)에서 많은 영향을 받았다.

## Markdown

단순 텍스트로 구조화된 도큐먼트를 만드는 방법은 여러 가지가 있다. 브라우저는 HTML을 원하지만, 사람이 쓰기에는 너무 장황하다. 개발자들은 특히 markdown이라는 포맷을 많이 사용하는데, GitHub 등의 기업들이 markdown을 많이 밀어주기도 했고 문법이 상당히 직관적이고 간결하다. 대부분의 문법이 HTML의 태그와 일대일 대응되지만 단순 텍스트 문서로 볼 때와 HTML로 볼 때의 차이가 작다.

### MDX?

markdown은 단순 텍스트에 치중된 표현력 때문에 다양한 웹 컴포넌트들을 표현하기 부족한데, 이 때문에 문서 내에서 HTML 태그의 사용을 허용한다. MDX는 MarkDown + JSX로 이를 React의 JSX로 바꾸어 활용도를 극대화한 포맷이다. 현재는 md 프로세싱 플러그인 remark와 문법 충돌이 일어날 것 같아 적용하지 않았지만 곧 사용할 것 같다.

## Gatsby plugins

타 React 프레임워크들과 비교했을 때 Gatsby의 특장점이다. 데이터를 끌어모으는 역할도 대부분 플러그인의 역할이지만, 정적 웹 사이트를 만들 때 고려해야 하는 여러 귀찮은 작업들을 알아서 해결해 준다. 설정에서 플러그인 이름과 옵션만 줄줄이 이어붙이면 적용이 끝난다. 이미지, 폰트 등의 prefetch, 서비스 워커 등을 이용한 오프라인 PWA 지원, 반응형 웹, 테마, RSS 피드 생성, 매니페스트 파일 생성, SEO, 구글 애널리틱스 등 직접 구현하려면 며칠씩 걸릴 기능들이 플러그인 사용으로 간단히 해결된다.

본 글에서는 블로그를 만드는 과정을 전부 설명하지 않고, 개괄적인 과정과 팁 등만 설명한다.

# 시작하기

Gatsby는 다양한 starter들을 제공한다. 하지만 나는 GQL 등 개발하면서 공부하고자 하는 컨셉들이 있었기 때문에 starter들의 코드베이스를 받아서 마음에 드는 부분을 체리피킹해서 가장 기본적인 starter template 부터 구현했다.

```bash
$ gatsby new [mysite] https://github.com/gatsbyjs/gatsby-starter-hello-world
```

해당 커맨드는 아무 플러그인, 디펜던시도 없는 Gatsby 레포지토리를 생성한다. typescript, eslint 등 설정을 마치면 이제 데이터를 가져오는 방법과 그 데이터를 활용하는 방법을 정의하여 블로그 문서들을 페이지로 만들어야 한다. 이 과정에서 Gatsby의 플러그인과 GraphQL을 다루는 방법이 익숙치 않았기 때문에 다른 starter 코드들을 읽으면서 대체 빌드 타임에 무슨 일이 일어나는지 공부했다.

## 페이지 만들기

Gatsby의 페이지들은 두 가지 방법으로 생성된다. 하나는 pages 디렉토리에 생성하는 JSX 파일의 이름대로 생성되는 페이지들이고, 하나는 gatsby-node.js 파일에서 함수를 통해 생성하는 페이지들이다.[^2] 블로그 글들은 JSX 파일이 아니라 md 파일들을 해석해서 보여주어야 하므로 후자의 방법으로 페이지를 생성해야 한다. 따라서 어딘가에서 md 파일들을 해석한 결과를 가져올 필요가 있다.

## 데이터 가져오기

Gatsby는 플러그인들을 통해 md 파일들을 먼저 불러오고, 불러온 텍스트를 또다른 플러그인으로 처리하여 메타데이터 생성, HTML로 변환 등을 수행한다. 그렇게 변환된 데이터는 전부 GraphQL의 형태로 접근할 수 있고, 그렇게 해야만 한다. 처음에 Gatsby를 쓰면서 가장 이해가 안되는 부분이기도 했다. 왜 GraphQL이어야만 했을까? JSON이나 YAML같은 텍스트 포맷도 아니고 JS 객체도 아닌 것이, 접근은 [tagged template literal](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)로만 가능해서 반환값에 타이핑도 안되고 여간 불편한 것이 아니었다. 하지만 쓰다 보면 확실히 조건부 쿼리, 필터링 쿼리 등이 가능해서 스크립트로 추가적인 데이터 조작이 거의 불필요하다는게 장점으로 다가왔고, 타이핑의 문제는 또다른 플러그인인 [graphql-codegen](https://www.gatsbyjs.com/plugins/gatsby-plugin-graphql-codegen)을 통해서 어느 정도 해결 가능하다.

Gatsby의 모든 GQL 쿼리들 - pageQuery, useStaticQuery 훅을 통한 쿼리, gatsby-node.js에서 부르는 쿼리 등은 모두 빌드 타임에 이루어진다. 따라서 빌드 후 배포할 때는 GQL에 대한 정보는 하나도 가지지 않고 빌드 타임에 생성된 데이터가 내재된 페이지만 남는다. 블로그 포스트 생성은 md 파일 하나당 하나의 페이지를 생성해야 하므로 md 파일 데이터의 리스트를 쿼리한 후 결과의 리스트를 순회하면서 createPage API를 호출하면 된다.

```javascript{numberLines: true}
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const BlogPost = path.resolve(`./src/templates/BlogPost.tsx`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  const posts = result.data.allMarkdownRemark.nodes;

  posts.forEach((post, index) => {
    createPage({
      path: post.fields.slug,
      component: BlogPost,
      context: {
        id: post.id,
      },
    });
  });
};
```

BlogPost.tsx에는 context가 전달된다. 이 context는 default export된 컴포넌트의 props로도 접근 가능하지만 pageQuery라는 이름으로 named export된 GQL 쿼리로도 전달되며, pageQuery의 실행 결과가 props의 data를 구성한다. 이는 생성되는 모든 page들이 동일하다. context로 전달된 id는 해당 포스트의 GQL ID 값이며 pageQuery는 이 값을 받아 실제 페이지에 필요한 HTML, 제목, 날짜 등의 정보를 가져와 BlogPost 컴포넌트에 전달하여 최종적으로 하나의 포스트 페이지가 생성된다.

onCreateNode에서 페이지당 실제로 생성될 경로를 나타내는 slug를 만드는 코드, 이전 페이지와 다음 페이지 데이터를 넘겨주는 코드도 필요한데, 여기에서는 생략했다. 대부분의 starter들이 비슷한 문맥으로 기능을 구현하고 있으니 적극적으로 참고하는 것을 추천한다.

# 기능 추가하기

한 번 구조가 잡히고 나면 그 뒤로 기능을 추가하기는 매우 쉽다. 사이트에 기능을 추가하고 싶으면 Gatsby plugin을 사용하여 거의 해결 가능하고, 마크다운에 표현하고 싶은 것은 마크다운 처리를 담당하는 remark의 plugin을 사용하면 된다. 반응형/프리페칭 이미지, 링크, 미주, 수식, 코드 등 플러그인만으로 아주 풍부한 문서를 만들 수 있다. 특히 아래 두 개의 라이브러리는 standalone으로도 쓰이지만 remark의 플러그인으로 쓰일 수 있어서 적용하는데 많은 노력이 들지 않았다.

- prism: 다양한 코드의 syntax highlighting을 제공한다.
- katex: tex 형태의 수식을 제공한다.

# 후기

처음 Gatsby를 사용하려고 시도했던 때에는 TypeScript도 React 생태계에 정착하기 전이었고 플러그인들이 뭔가 엉성하다는 생각이 많이 들었었다. 물론 내 실력도 엉성해서 어떤게 문제였는지는 모르지만... 지금은 제공하는 플러그인들의 기능이 정말 강력하다는 생각이 든다. 정적 사이트뿐만 아니라 웹앱을 만들기 위한 많은 것들이 out-of-the-box로 제공되는 느낌이다. 그래서 코드를 쓰는 것도 그 결과물을 보는 것도 즐겁다. 블로그인만큼 글을 더 많이 써야겠지만, 당분간은 코드를 더 많이 쓸 것 같다.

[^1]: [GitHub pages](https://pages.github.com), 소위 github.io 정적 호스팅 서비스에서 많이 밀어준다.
[^2]: 내부적으로는 완전히 동일한 API를 사용할 수도 있다.
