---
title: 내가 2020년에 새로운 React 프로젝트를 만드는 방법
date: 2020-10-25T11:11:04.943Z
description: 레포 셋업부터 최적화된 배포까지
tags:
  - react
  - deploy
---

2020년에 전 세계를 대상으로 프론트엔드 웹앱을 배포하는 것은 이전과 비교하면 아주 쉬운 일이 되었다. 선택할 수 있는 프레임워크, 라이브러리, 개발 환경뿐만 아니라 도메인을 달고 성능을 최적화하고 CDN 등을 이용하여 세계 어디에서든 웹앱을 접근 가능하도록 하는 방법과 서비스는 정말 많다. 만약 현재, 그러니까 2020년 하반기에 내가 새로운 웹앱 프로젝트를 선택한다면 - 물론 이 블로그를 포함해서 - 내가 선택할 프레임워크와 개발 환경, 배포 방식과 이를 위해 이용할 서비스들을 적어보고자 한다.

쓰다 보니 내용이 너무 방대해질 것 같아서, 각 챕터에 대해 자세하게 설명하지는 않고 사용하는 프레임워크와 라이브러리들을 간략하게만 서술한다.

# 프로젝트 시작하기

모든 최신 프론트엔드 개발은 프레임워크나 라이브러리의 스타일대로 코드를 작성하고 컴파일링, 번들링 등을 거쳐 HTML, CSS, JS 파일들과 기타 미디어 파일들로 변환된다. React 또한 그냥 라이브러리로서 사용하면 직접 컴파일링, 번들링을 설정할 수 있고, 다양한 React 프레임워크를 사용하면 이것들을 직접 관리하지 않고도 결과물을 만들어낼 수 있다.

## scratch React 프로젝트

프레임워크를 사용하지 않는다면, React의 JSX 문법들의 변환, 높은 버전 JS에 있는 기능들의 폴리필 등을 직접 해주어야 빌드된 결과물이 대부분의 브라우저에서 원하는대로 출력된다.

- [webpack](https://webpack.js.org/): 사실상 표준 번들러이다. 프레임워크들도 내부적으로는 모두 webpack을 사용한다. 복잡한 설정으로 안티팬이 많다.
- [gulp](https://gulpjs.com/): webpack에 대항하는 번들러인데, 사용해본 적이 없다.
- [babel](https://babeljs.io/): JS 컴파일러로 원하는 브라우저에서 돌아갈 때까지 새로운 기능을 폴리필하거나 현재 최신 JS 버전에서 없는 기능을 끌어다 쓰는 것도 가능하다.

## 프레임워크 사용하기

사실상 표준 컴파일러, 번들러인 webpack, babel의 설정이 어렵기로 악명이 높다. 그래서 요즘엔 이 설정들을 편하게 하면서도 이들의 다양한 기능을 완전히 활용할 수 있도록 해주는 프레임워크들을 사용하는 경우가 많아졌다. 설정의 자유도가 조금 떨어진다는 것이 단점이다.

- [create-react-app(CRA)](https://create-react-app.dev/): 페이지 생성, 라우팅 등을 제공하지 않는 가장 기본적인 프레임워크이고, 커스텀 webpack, babel 설정도 불가능하다. React를 시작할 때 가장 많이 사용하는 방법이며, [react router](https://reactrouter.com/)를 같이 사용하여 라우팅을 관리하는 것이 좋다.
- [next](https://nextjs.org/): 자동 페이지 생성, 라우팅을 제공하고 특장점으로 서버 사이드 렌더링(SSR)을 쉽게 지원한다. API를 따로 두는 서비스들은 렌더링 시간을 줄이기 위해 고려할 만하다.
- [gatsby](https://www.gatsbyjs.com/): 자동 페이지 생성, 라우팅을 제공하고 정적 페이지 생성에 특화되어 있다. 빌드 타임 이후 추가적인 데이터를 가져올 필요가 없는 서비스들에 좋다.

# 개발하기

## [TypeScript](https://www.typescriptlang.org/)

**지금 새로운 JS 프로젝트를 시작하려 한다면, 당장 TypeScript 사용을 시작하자.** Typed JS를 시도한 프로젝트 중 TS는 가장 sound하고, 가장 JS와 비슷하며, 당신의 프로젝트의 생산성을 올리고, 유지보수를 용이하게 하고, 코드의 가독성을 향상시킬 것이다. 그리고 만약 JS만 할 줄 아는 프론트엔드 개발자라면, TS를 배우는 것이 당신의 가치를 올리는 가장 쉽고 빠른 방법일 것이다!

## 코드 스타일을 통일하기

JS는 멀티 패러다임, loosely typed 언어이기 때문에 여러 개발자가 원하는 방식대로 코드를 짜면 서로 알아보기도 힘들고 유지보수가 어려워진다. 그래서 같은 의미의 코드를 쓸 때도 코드를 일정한 스타일로 통일하기 위해 linter와 formatter를 사용한다.

- [eslint](https://eslint.org/): JS linter인데 요즘은 typescript-eslint라는 프로젝트로 타입과 타입 시스템에 대한 linting도 지원하기 시작했다.
- [prettier](https://prettier.io/): 코드 포매터이다. JS, TS, MD, YML, JSON 등등 다양한 파일 형식의 포매팅을 지원한다.

## 디자인

웹의 모든 디자인 요소는 CSS로 기술되지만 CSS 그 자체는 굉장히 안좋은 syntax와 semantics를 가지고 있다. 이를 해결하기 위한 다양한 솔루션들이 있는데, webpack 또는 프레임워크의 지원으로 좀 더 rich하고 유지보수가 쉬운 syntax로 스타일을 표현할 수 있다.

- css: 클래스로 스타일을 담고 JSX 내에서 className props로 적용한다.
- scss: 좀 더 rich하고 nested된 스타일 적용이 가능하다. 필자는 css-in-js에 대만족중이라 사용해본 적이 없다.
- postcss: scss와 같은 스타일시트들을 css로 변환시키는 일종의 전처리기이다. webpack의 loader로서 사용한다.

### CSS-in-JS

JS 코드 안에 스타일시트를 템플릿 스트링의 형식으로 내장하는 방식이다. className로 적용하는 스타일링보다 훨씬 명시적이고 JS 내의 변수들의 변화에 따라 스타일의 변화를 주기도 쉽다. 대부분 내부적으로 변수에 따라 스타일이 변하면 변경된 스타일의 클래스를 임의의 해쉬로 생성하고 클래스명을 수정하는 식으로 구현되어 있는데, 그래서 너무 자주 변하는 값을 템플릿 스트링에 담으면 웹페이지의 퍼포먼스가 떨어질 수도 있다는 단점이 있으니 이것만 유의해서 작성하면 된다.

- [styled-components](https://styled-components.com/): div, span, a 등 HTML 태그에 스타일을 입힐 수도 있고 기존에 존재하는 컴포넌트를 감싸 스타일을 먹일 수도 있다. 간단하게 CSS 애니메이션, 테마 적용 등이 가능하다.
- [emotion](https://emotion.sh/): styled-components에서 영향을 받은 CSS-in-JS 라이브러리이다. 매우 비슷한 API를 가지고 있고, 현재 이 블로그에서 쓰고 있는데 아직까지 큰 차이점을 느끼지 못했다.

## 디자인 시스템

좋은 프론트엔드 코드베이스는 반복적으로 사용되는 컴포넌트들이 코어의 앱 데이터와 분리되어 별도의 객체로서 관리된다. 그런데 그런 컴포넌트들이 담는 로직이 많아지고 컴포넌트의 수가 많아질수록 각 컴포넌트가 어떻게 동작해야 하는지가 모호해지고 유지보수가 힘들어진다. 잘 도큐멘테이션된 디자인 시스템은 이러한 문제를 해결할 수 있고, 디자이너들과의 협업을 수월하게 해준다.

- [storybook](https://storybook.js.org/): 각 컴포넌트의 문서를 story로서 남기고, 동작을 조작해보거나 스냅샷 테스팅을 할 수 있다.

## 다양한 웹앱의 기능을 빠르게 구현하기 위한 라이브러리들

- UI 라이브러리

  웹앱에서 매우 자주 사용되지만 직접 구현하기 귀찮은 컴포넌트들을 패키지 형태로 제공한다.

  - [material](https://material-ui.com/): 구글의 디자인 시스템
  - [antd](https://ant.design/): 중국 알리바바의 디자인 시스템
  - [fluent(uifabric)](https://developer.microsoft.com/en-us/fluentui#/): MS의 디자인 시스템

- form

  HTML form 태그에 담긴 input들을 관리하고 에러나 검증 메시지를 띄워준다.

  - [formik](https://formik.org/)
  - [redux-form](https://redux-form.com/)
  - [react-hook-form](https://react-hook-form.com/): hooks API만을 이용한다.

- i18n

  사용자의 언어에 따라 번역된 페이지를 보여준다.

  - [react-intl](https://formatjs.io/docs/getting-started/installation/)
  - [react-i18next](https://react.i18next.com/)

### AJAX: 비동기적 데이터 요청

API 서버가 있는 웹 프론트엔드는 비동기적인 HTTP 요청을 통해 API 서버에서 데이터를 수신해야 한다. AJAX를 왜 사용해야 하는지는 별도의 글에서 다뤄보도록 하고, 지금은 어떤 라이브러리를 통해 달성하는지만 서술한다.

- [axios](https://github.com/axios/axios): JS HTTP 클라이언트의 일종이다. Promise를 기반으로 작동하며, 인터셉터를 통해 인증 헤더 주입, 다양한 형태의 body 전송 등이 가능하다.
- [swr](https://github.com/vercel/swr): next를 만든 Vercel사의 라이브러리로, 같은 path를 사용하는 GET API 엔드포인트들의 결과를 훅을 통해 동기화, 한 번에 재검증한다. Redux를 사용하지 않고도 앱 데이터를 일관성있게 유지할 수 있다.

## 상태 관리

앱에서 전역적인 상태 관리는 매우 중요하다. 앱 전체에서 동기화되어 가지고 있어야 할 데이터를 지역적으로 따로 들고 있다면 API 요청 시마다 앱의 각 부분이 따로따로 움직일 것이다.

### 전역 상태 저장소

React는 기본적으로 props를 통해 컴포넌트 트리 아래로 상태 전달을 할 수 있지만 Provider로 감싸진 스코프 내에서 동일한 state와 dispatch를 사용하는 방법으로 전역적 상태 동기화를 달성할 수 있다.

### 커스텀 훅 + Context API

React에서 기본적으로 지원하는 방법이지만 객체를 담을 경우 변경된 부분만이 아니라 컨텍스트를 사용하는 모든 컴포넌트들이 리렌더링되는 문제가 있다. 각종 설정을 통해 거의 Redux와 비슷한 환경을 셋업할 수는 있겠으나, 그럴 바에 Redux를 쓰는 것이 이득이다.

다만 완전 전역적은 아니지만 일부분의 UI 상태를 깊은 트리 위에서 공유하고 싶다면 context를 사용하는 경우가 있다. 예를 들면 에러 다이얼로그의 open 상태 혹은 내용을 하위 컴포넌트에서 조작하고 싶을 땐 Redux보다 별도의 context를 사용하는 것이 좋다.

### [Redux](https://redux.js.org/)

facebook의 개발 패턴 Flux의 구현체로, 여러 대기업들의 프론트엔드 엔지니어링 노하우가 집대성된 산물이기도 하다. 미들웨어를 덮으면 전역적 상태 관리뿐만 아니라 어떤 로직의 실행조차도 dispatch만을 통해 수행될 수 있도록 셋업이 가능하다.

이외에도 mobx같은 라이브러리들이 있으나, 아직 use case를 보지 못했다. 나중에 Redux와 Flux, dispatch, selector, action, reducer에 대해서는 따로 다뤄보기로 한다.

### 선택자(Selector) 사용하기

선택자는 Redux 저장소에서 쿼리한 결과를 캐싱하고 때때로 여러 선택자를 compose해서 조립된 데이터를 만들어낼 때도 유용하다.

- [reselect](https://github.com/reduxjs/reselect): Redux에서 직접 관리하는 선택자 라이브러리이다.

생성한 선택자는 Redux의 useSelector 훅으로 가져다 쓸 수 있다.

### 상태를 immutable하게 유지하기

mutable한 상태는 애플리케이션의 일관성(consistency)을 해친다. 상태 변화는 오로지 dispatch를 통해서만 이루어져야 하며 변화된 상태는 equality check를 실패해야 하므로 변화된 레퍼런스를 가져야 한다. JS의 spread 연산자를 통해 이를 달성할 수 있는데 깊게 nested된 데이터를 항상 그런 식으로 관리하는 것은 어렵다. 따라서 일반적으로 상태 객체를 감싸는 라이브러리를 사용한다.

- [immutable](https://immutable-js.github.io/immutable-js/): facebook의 작품 중 하나인데 요즘은 업데이트가 되고 있지 않다.
- [immer](https://immerjs.github.io/immer/docs/introduction): mutable한 것처럼 데이터를 조작하여도 immutable한 결과를 얻을 수 있도록 변화 과정을 알아서 감싸준다.

### Side effect 사용하기

side effect를 미들웨어로 처리하여 비동기적인 작업을 오롯이 Redux 내부에서만 처리할 수 있게 되는 것이 대부분의 Redux를 사용하는 애플리케이션들의 최종 목표이다. 여기서도 이런 것들이 있다 정도만 짚고 넘어가자.

- [redux-thunk](https://github.com/reduxjs/redux-thunk): action으로 promise를 전달한다.
- [redux-pender](https://github.com/velopert/redux-pender): thunk와 비슷하게 promise를 전달하고 몇 가지 추가 기능을 제공한다.
- [redux-saga](https://redux-saga.js.org/): ES6 generator를 사용하여 비동기 작업들의 관리를 달성한다.
- [redux-observable](https://redux-observable.js.org/): rxjs를 사용하여 비동기 작업들의 관리를 달성한다.

API와 웹앱의 구조가 복잡해질수록 saga와 observable 등이 빛나지만, 러닝 커브가 상당히 높은 편이다.

## 테스트

테스트 코드의 중요성은 두 말 할 필요가 없다. 프론트엔드 테스팅은 유틸이나 로직을 테스트하는 경우가 있고 컴포넌트의 렌더링 결과를 테스트하는 경우가 있다. 후자는 스냅샷 테스팅이라고도 하며 이것도 결과물의 HTML/CSS를 별도의 파일에 담아두는 방식과 가장 극단적으로는 더미 브라우저에서 실행한 렌더링 결과를 비교하는 테스팅도 가능하다.

아래는 주로 쓰이는 테스트 프레임워크들이다.

- [jest](https://jestjs.io/): 비동기적으로 테스트들을 실행하며 스냅샷 테스팅이 가능하다. 모듈의 모킹도 가능해서 테스팅에 필요가 없는 라이브러리들을 스냅샷 등에서 배제할 수 있다.
- [mocha](https://mochajs.org/): 순차적으로 테스트들을 실행한다. 기능적으로 부족한 점이 많아서 [chai](https://www.chaijs.com/)등의 assertion 라이브러리와 같이 쓰곤 한다.

# 프로젝트 배포하기

열심히 프로젝트를 만들고 개발 환경에서 잘 동작하는 것을 확인하고 나면 도메인을 달아 인터넷에 배포해서 모두가 프로젝트를 볼 수 있도록 해야 한다. 프론트엔드 배포는 직접 저장소, CDN과 DNS를 설정하는 IaaS를 이용한 배포와 대부분의 작업들을 자동으로 수행해주는 PaaS를 이용한 배포가 있겠다.

## PaaS

이 서비스들은 빌드 스크립트와 배포할 디렉토리를 지정하면 특정 브랜치에 푸시만 하면 자동으로 배포 사항들을 업데이트해준다. DNS 관리, 커스텀 서브도메인, HTTPS 인증서 발급 등을 자동으로 처리해준다.

- [Github pages](https://pages.github.com/): Github에서 호스팅한다. 개발 블로그 등을 여기에 굉장히 많이 배포한다.
- [Netlify](https://netlify.app/): 정적 사이트 배포, 서버리스 SSR, 서브도메인 제공 등 기능이 아주 다양하다. 정말 편한데, 딱 하나 아쉬운게 거슬릴 정도로 첫 로딩이 느리다. 조금만 더 빨랐어도 aws는 손도 안댔을 것 같다.
- [Vercel](https://vercel.com/): Netlify와 유사하다. 얘도 정말 좋은데 DNS 설정이 잘 안되서 포기했었다.

이외에도 [surge.sh](http://surge.sh) 같은 서비스가 있는데 안써봤다.

## IaaS

100개 중 99개가 대만족이어도 하나가 아쉬우면 결국 그걸 직접 고치기 위해 IaaS로 넘어온다. 내가 돈을 많이 내면 해결해주겠지만... 나랑 비슷한 상황의 헤비 유저가 없는 이상 그 플랫폼은 내 문제를 해결해 줄 필요가 없다.

### AWS S3 + CloudFront

최고의 클라우드 서비스. AWS는 한국 리전 설치 이후 한국에서도 절찬리에 사용중이기 때문에 커뮤니티도 크고 use case도 넘쳐난다. route 53과 github action에 s3와 cloudfront를 싸먹는 방법은... 별도의 글로 분리해서 더 자세하게 시행착오를 적어보도록 하겠다.

# 정리

스크래치부터 React 프로젝트를 셋업, 개발하고 배포하는 과정을 정리해보았다. 초보 개발자인데 너무 내용이 많으면 겁먹지 말고 CRA나 next로 첫 페이지를 만드는 것부터 시작하자. 이것저것 개발하다 보면 뭔가 부족한 기능을 채우기 위해 이것저것 공부하게 될 것이고, 그러면서 여기 적힌 내용들을 자연스레 전부 알게 될 것이다.
