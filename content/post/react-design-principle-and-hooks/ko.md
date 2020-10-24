---
title: React의 설계 철학과 Hooks
date: 2020-10-24T01:16:53.518Z
description: React가 프론트엔드 엔지니어링의 리더일 수밖에 없는 이유
tags:
  - react
  - functional programming
---

React는 프론트엔드 생태계를 최전방에서 이끄는 프레임워크들 중 하나이며, 이는 여러 설문조사 및 실제 사용 빈도를 통해 드러난다[^1]. React에서 등장한 새로운 컨셉이나 아이디어는 얼마 지나지 않아 다른 UI 프레임워크/라이브러리들에서 구현되곤 한다. React의 헤드 개발자들은 이런 React의 위상을 잘 인지하고 항상 새로운 프로그래밍 컨셉과 아이디어들을 생태계로 가져오기 위해 부단히 노력하는 듯하다. React를 가져다 쓰는 입장에서도 그들의 설계 철학과 새로운 아이디어들을 학습하려 하지 않는다면, 몇 년이고 쓰던 코드를 똑같이 반복하는 코더가 될 뿐이다. 그래서 그들의 디자인 철학 중 내가 영향을 받은 부분들과 Hooks API를 소개하면서 이것이 어떻게 나타났는지 적어볼 것이다.

# React의 설계 철학

React의 설계 철학은 docs 페이지에서도 상세히 설명되어 있으며 커뮤니티가 개발에 적극적으로 참여하는 오픈 소스 프로젝트임에도 이 디자인 철학들에 위배되는 코드들은 core에 포함되지 않는다. 이 철학들 또한 대부분 소프트웨어 공학이나 프로그래밍 패턴의 관점에서 수 년에서 수십 년의 검증을 거친 방법론들로 이 사항들을 지키며 만들어낸 소프트웨어는 구조화되어 있고, 유지보수 및 리팩토링이 편하고, 오류가 적으며 디버깅이 쉽다[^2].

## 합성

React는 컴포넌트와 로직의 재사용성을 극대화하기 위해 모든 것을 분리, 합성할 수 있도록 설계되었다. JSX syntax는 작성된 React 컴포넌트를 다른 컴포넌트의 어떤 곳에서든 호출하여 완전히 동일한 결과를 얻을 수 있도록 한다. 재사용되는 로직은 HOC, render props, custom hook 등 다양한 방법으로 컴포넌트로부터 분리될 수 있다. 분리된 로직 역시 어떤 컴포넌트에서 사용하여도 동일한 결과물을 얻을 수 있다. 본 글에서는 특히 훅의 합성과 재사용성에 대해 다룬다.

## 단방향 데이터 흐름

React에서 데이터는 반드시 단방향으로 흐른다. 이는 모듈화로 분리된 로직과 컴포넌트들은 전달된 함수를 호출하는 것 외에는 상위 컴포넌트에 영향을 끼칠 수 없음을 의미한다. 상위 컴포넌트 역시 데이터의 변경 없이 하위 컴포넌트의 리렌더를 강제할 수 없다. 이는 각 컴포넌트가 앱에 끼치는 side effect를 최소화한다. 이러한 가정이 있기 때문에 오픈 소스로 풀려 있는 컴포넌트들을 내 프로젝트에 가져와서 아무 문제 없이 사용할 수 있는 것이다. 일반적으로 상위에서 하위로 전달하는 데이터는 props를 통해 immutable한 JS 객체로 전달되고 하위에서 상위로 데이터를 전달하기 위해서는 props로 전달된 함수를 호출하고 상위 컴포넌트에서 해당 함수의 호출을 적절하게 핸들하는 방식으로 작성해야 한다. 종종 너무 깊은 레벨의 데이터 교환이 필요한 경우 Context API 또는 [Redux](https://redux.js.org/)와 같은 상태 관리 라이브러리를 통해 상태를 전달하는데, 이러한 방법들 역시 dispatch와 state가 최상위 Provider 컴포넌트에 묶여있으므로 단방향 데이터 흐름을 위배하지 않는다.

다만 ref와 imperative handle을 적극 사용해야 하는 경우 이를 위배하는 패턴으로 코드를 작성할 수 있는데, 이는 나중에 따로 다룰 수 있으면 다뤄보도록 한다.

## Lean한 core

React는 React가 제공해야 할 기능들 중에서 가장 최소만을 제공한다. 제안된 새로운 기능이 이미 React core 하에서 구현이 가능하다면 별도의 라이브러리를 통해 구현하고 core에는 포함하지 않는다. 만약 그 기능이 수많은 first-class 사용자들(Facebook, MS, Twitter, Airbnb, ...)로부터 제안된다면 가장 안전한 방법을 통해 core API를 변경한다[^3]. 이러한 조심스러운 개발 로드맵이 React를 신뢰할 수 있고 큰 trade-off 없이 업데이트를 적용할 수 있도록 한다.

# Hooks API

이러한 개발 철학 하에서, hook(이하 훅)은 이 사항들을 철저히 준수하면서 core에 포함되었다. [Hooks 소개 페이지](https://ko.reactjs.org/docs/hooks-intro.html)에서 React의 개발자들이 이 기능을 도입하기 위해 얼마나 조심스럽게 접근했는지 드러난다. 처음 React가 등징했을 때보다 함수형 프로그래밍에 대한 개발자들의 이해도가 증가했고, 그 장점 또한 여러 분야에서 드러났다. React는 이미 함수형 컴포넌트를 지원하고 있었지만, 개발자들은 stateless한 함수형 컴포넌트를 작성한 뒤 상태를 주입하기 보다는 클래스 컴포넌트를 작성하는 방법을 선호했다. 그러나 훅이 등장하고 나서 단순히 상태 뿐만이 아니라 리렌더를 요구하는 모든 커스텀 로직을 모듈화된 훅으로 작성하는 것이 가능해졌고, 기존의 로직을 모듈화하는 방식인 HOC이나 render props보다 성능, 시인성, 개발 편의성 등 모든 면에서 훅이 유리하자 React 생태계는 훅을 중심으로 발전하기 시작했다.

## state와 dispatch 관리

이제 `use-`로 시작하는 함수들을 함수형 컴포넌트 안에서 훅으로 사용한다. 값을 반환하는 훅도 있고 그렇지 않은 훅들도 있다. 훅의 반환값은 근본적으로 props와 성질이 동일하다. 만약 객체를 반환한다면 그 훅이 반환하는 객체가 변경될 때마다 컴포넌트는 리렌더링된다. 만약 함수를 반환한다면 그 훅이 관리하는 상태의 변화를 트리거할 수 있다. 글로 설명하기보다 가장 간단하고 보편적이고 클래스 컴포넌트의 지위에 가장 심대한 타격을 줬다고 볼 수 있는 `useState` 훅을 보자.

```jsx{numberLines: true}
function Component() {
  // highlight-next-line
  const [value, setValue] = useState(0);

  return (
    <div>
      <span>value: {value}</span>
      <button onClick={() => setValue(value + 1)}>increase!</button>
    </div>
  );
}
```

`value`는 근본적으로 props와 같아서 이 값이 변경되면 해당 값을 사용하는 `span`을 리렌더링한다. `setValue` 또한 props로 전달된 함수 또는 콜백과 같아서 `value`의 값을 수정하면서 이에 따른 `Component` 하위 컴포넌트들의 리렌더링을 트리거한다. 이러한 구조가 가지는 장점은 내 생각에는 이 정도가 있다:

1. setter들은 각자의 이름으로 불린다; setState라는 단일 setter를 사용할 때보다 훨씬 명료하며 한 state의 업데이트로 state를 사용하는 모든 컴포넌트가 리렌더링되지 않는다.
2. 각 state의 초기값은 훅의 파라미터로 설정된다.
3. event handler를 별도의 함수 선언 없이 inline으로 사용한다.

3번에 대해서는 논란의 여지가 있어 별도의 글에서 다뤄보도록 하겠다. 아무튼, `useState`만 봐도 훅을 이용한 상태 관리의 장점은 명확하게 드러난다.

## 더욱 선언적인 lifecycle, effect 관리

`useEffect`훅은 더 나아가서 기존에 `componentDidMount`, `componentWillUnmount`, `componentDidUpdate`등과 같은 lifecycle 훅들을 하나의 API로 통일해버렸다. 코드와 예시를 통해 설명하겠다.

```jsx{numberLines: true}
function Component() {
  // ... state defs
  // highlight-start
  useEffect(() => {
    const subscriber = chatAPI.subscribe();
    return () => subscriber.unsubscribe();
  }, []);
  useEffect(() => console.log('component updated'));
  useEffect(() => console.log(`value changed: ${value}`), [value]);
  // highlight-end

  return (
    <div>
      <span>value: {value}</span>
    </div>
  );
}
```

`useEffect`가 전달받는 두 번째 param에 주목해아 한다. 첫 번째 effect는 빈 배열을 가지고 있는데 이는 이 effect가 어떠한 내부 상태의 변화에서도 실행될 필요가 없다는 뜻으로, `componentDidMount`, `componentWillUnmount`처럼 컴포넌트의 시작과 끝 lifecycle에만 영향을 받는다. 첫 번째 effect의 반환값이 함수임에 주목하자. 함수를 반환하면 effect의 deps가 변할 때마다 이 전 effect의 반환 콜백을 실행 후 업데이트된 effect를 수행한다. 이 경우에는 `componentWillUnmount`의 동작과 동치이다. 두 번째 effect는 컴포넌트의 리렌더링 시마다 매 번 실행된다. 이는 `componentDidUpdate`의 동작과 동치이다. 마지막 effect는 리렌더링 호출들 중 `value`의 업데이트 시에만 호출된다. 기존의 `componentDidUpdate` 내에서 deps를 비교해가며 위험한 상태 변화를 수행하던 것과 비교하여 훨씬 명시적이고 예측되지 않은 에러에 강하다.

## 제공된 primitive 훅들을 합성한 커스텀 훅으로 로직 주입

위에서 언급했듯, 훅은 어떤 특정한 작업을 타게팅하고 있지도 않고 생성하기 위해 대단한 작업이 필요한 것도 아니다. [주어진 규칙들](https://ko.reactjs.org/docs/hooks-rules.html)을 준수하며 선언된 모든 함수는 훅이다. 위 컴포넌트들에서 사용된 로직은 하나의 훅으로 통합될 수 있다:

```jsx{numberLines: true}
function useValue() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const subscriber = chatAPI.subscribe();
    return () => subscriber.unsubscribe();
  }, []);
  useEffect(() => console.log('component updated'));
  useEffect(() => console.log(`value changed: ${value}`), [value]);

  return [value, setValue];
}

function Component() {
  const [value, setValue] = useValue();

  return (
    <div>
      <span>value: {value}</span>
      <button onClick={() => setValue(value + 1)}>increase!</button>
    </div>
  );
}
```

이러한 커스텀 훅들은 재사용성이 매우 뛰어나고 안전하다. 커스텀 훅을 작성하기 위해 대단한 지식이 필요하지도 않는다. 최근 대부분의 React 라이브러리들은 API를 HOC 또는 render props뿐만 아니라 커스텀 훅의 형태로 제공하기 시작했고, 완전히 훅으로만 이루어진 라이브러리들도 많다[^4]. 이렇게 제공된 라이브러리의 훅들조차도 커스텀 훅을 이용해서 여러 번 합성이 가능하다.

HOC과 클래스 컴포넌트로 같은 로직을 작성하면 다음과 같이 될 것이다. 주의할 점은, HOC과 render props 등의 로직 주입 방법이 안티패턴은 아니라는 것이다.

```jsx{numberLines: true}
function withValue(Child) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: 0 };
    }

    componentDidMount() {
      this.subscriber = chatAPI.subscribe();
    }

    componentDidUpdate(_, prevState) {
      console.log('component updated');
      if (!Object.is(this.state.value, prevState.value)) {
        console.log(`value changed: ${this.state.value}`);
      }
    }

    componentWillUnmount() {
      this.subscriber.unsubscribe();
    }

    render() {
      return (
        <Child
          value={value}
          setValue={() => this.setState({ value: this.state.value + 1 })}
        />
      );
    }
  };
}

const Component = withValue(({ value, setValue }) => (
  <div>
    <span>value: {value}</span>
    <button onClick={() => setValue(value + 1)}>increase!</button>
  </div>
));
```

## 함수형 프로그래밍과 훅

객체지향 프로그래밍(OOP)에서 함수형 프로그래밍으로 엔지니어링 패러다임이 넘어온지는 불과 10년도 되지 않았다[^5]. 하지만 개발자들이 점점 이에 익숙해지고 함수형 프로그래밍의 장점을 체득하자 자연스럽게 immutable한 데이터 구조들, side effect 없는 순수 함수들로 작성된 모듈에 대한 수요는 점점 늘어났다. 훅은 함수형 프로그래밍의 장점을 React에 가져올 수 있는 좋은 방법이었다. 훅을 사용한 컴포넌트들은 mutable하고 안전하지 않은 this의 핸들링에서 벗어났으며 훨씬 선언적이고 이해가 쉬운 방식으로 커스텀 로직을 가져다 쓰기 시작했다. 훅이 기존의 클래스 컴포넌트들보다 React 설계 철학에 훨씬 더 부합하는 패러다임이 되었고, 논의 끝에 core에 포함된 이후 React, 더 나아가 프론트엔드 코딩 패러다임에 변화가 일어났다.

# 결론

React의 변천사 및 훅 API가 코어에 포함되는 과정은 단순 React 사용자들뿐만 아니라 오픈소스 프로젝트의 관리, 소프트웨어 엔지니어링 측면에서 배울 점이 많다고 생각한다. 코어를 개발하는 커뮤니티, 더 나아가 이를 최전방에서 지휘하는 개발자들의 철학이 React를 leading tech로 만들고 많은 팬들을 만들었다고 생각한다.

# Reference

- [Design Principles from React docs (한국어)](https://ko.reactjs.org/docs/design-principles.html)
- [What is the prior art for hooks?](https://reactjs.org/docs/hooks-faq.html#what-is-the-prior-art-for-hooks)

[^1]: [stateofjs 설문조사](https://2019.stateofjs.com/front-end-frameworks/), [stackoverflow 설문조사](https://insights.stackoverflow.com/survey/2019#technology-_-web-frameworks), [npm 다운로드 트렌드](https://www.npmtrends.com/angular-vs-react-vs-vue)
[^2]: 최선의 퍼포먼스를 제공하지는 않으나, 보통 유의미한 차이가 나타나지 않는 선에서 개발 편의성을 극대화하는 방향을 택한다. 모든 프로그램을 C나 어셈블리로 작성하지 않는 이유와 일맥상통한다.
[^3]: componentWillMount와 같은 위험한 API는 즉시 제거되지 않고 UNSAFE 플래그가 붙은 상태로 몇 년간 유지된 뒤에 사라졌다.
[^4]: [react-hook-form](https://react-hook-form.com/)은 HTML form의 input들의 상태를 훅으로 관리한다. [swr](https://github.com/vercel/swr)은 API fetch의 결과를 같은 path를 사용하는 컴포넌트들 사이에 동기화하며 자동으로 retry 등을 관리한다.
[^5]: 이는 엔지니어링의 영역에 따라 틀린 말일 수도 있다. 프론트엔드의 경우, React 훅 이전에는 컴포넌트를 ES6 클래스로 관리하는 것이 일반적이었다.
