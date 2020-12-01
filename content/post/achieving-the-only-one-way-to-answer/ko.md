---
title: 하나의 유일한 정답 코드를 쓰는 법
date: 2020-11-28T11:52:35.765Z
description: 개발자 자신과 동료들을 위한 typing, linting과 formatting
tags:
  - typescript
  - python
---

파이썬의 철학을 담는 Zen of Python이라는 문서가 있다. 이 문서는 일종의 이스터 에그로 Python REPL에서 쉽게 확인할 수 있다.

```python
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

이 문장들은 단순한 이스터 에그가 아니라, 좋은 개발자가 코드를 쓸 때 숙지해야 하는 기본적인 사실들을 나열하고 있다. 이번 글은 소위 clean code라고 하는, **읽기 쉽고 협업하기 좋은 코드**를 작성하는 방법을 설명하는 첫 번째 글이다. 앞으로도 clean code에 대한 글을 많이 쓸 예정이지만, 오늘은 특히 저 Zen of Python에 나온 규칙들에 대해서 설명하려고 한다. 특히 내가 가장 좋아하기도 하는 아래 문장에 대해서 Python과 TypeScript 개발자가 어떻게 이를 달성할 수 있는지에 대해서 쓰고자 한다.

> There should be one-- and preferably only one --obvious way to do it.

# Why

왜 하나의 정답만을 추구해야 할까? 같은 결과물을 내는 다양한 코드를 쓸 수 있지 않을까? 기능이 같더라도 그 기능을 구현하는 방법은 절차적 방법, 객체지향적인 방법, 선언형 또는 함수형인 방법 등 여러 가지가 있을 수 있다. 단순히 어떤 객체의 반복을 돌더라도 절차적으로 반복문을 쓰는 방법, 함수형으로 순환자(iterator)를 순회하는 함수를 전달하는 방법, 재귀함수를 이용한 방법 등이 있을 수 있다. JavaScript와 Python은 멀티 패러다임 언어로, 가능한 거의 모든 프로그래밍 패턴을 지원한다. 그리고 이를 프로그래머 또는 팀이 스스로 제한하는 것은 마치 프로그래머의 선택권을 좁히고 스스로 한계를 만드는 것처럼 보인다.

그러나 어떤 기능을 여러 가지 방법으로 구현할 수 있다는 말은, 달리 말하면 하나의 방법으로 구현 방식을 획일화해도 반드시 문제를 해결할 방법이 존재한다는 말이기도 하다. 임의의 프로그래밍 패턴은 다른 패턴이 풀 수 있는 모든 문제를 해결할 수 있다[^1]. 실행 시간이나 메모리 소모량은 조금씩 다를 수 있지만, 극단적인 최적화가 필요한 기능이 아니면 **잘 짜여진 코드**는 적당한 시간과 적당한 메모리 소모로 같은 결과를 낼 수 있다.

소요되는 시간과 메모리에 큰 이득이 없다면, 어떤 것이 더 좋은 코드인지는 성능이 아닌 **가독성**과 **협업 용이성**으로 판단하여야 할것이다. 코드는 절대로 영원할 수 없고, 나 또는 누군가는 내가 작성한 코드를 언젠가는 수정하거나 삭제해야 한다. 그런데 프로그래밍 언어 또는 개발 팀이 *다양한 정답*을 허용한다면, 어떤 개발자는 이 패턴으로 코드를 쓰고 다른 개발자는 저 패턴으로 코드를 작성할 것이다. 그렇게 되면 서로가 작성한 코드를 봤을 때 이해하기 어려울뿐만 아니라 유지보수에 들어가기 전에 그 코드를 이해시키는데 시간을 잡아먹으므로 개발 자원을 낭비하는 셈이 된다. 그래서 구현의 다양성을 억압하는 면이 있음에도 개발자 혹은 개발 팀은 모두 *하나의 정답*을 목표로 하고 개발에 임하는 것이 이득이다.

# How

하나의 정답을 강제하는 데에도 다양한 방법이 있을 수 있다. 가장 근본적으로는 프로그래밍 언어 차원에서 하나의 패턴만을 프로그래머에게 강요하는 것이다. Haskell은 순수 함수형 언어로, 코드를 절차형으로 작성할 방법을 근본적으로 차단하며 단지 이를 흉내낼 방법만을 제공한다. C언어는 아직 람다 대수 등 함수형 프로그래밍의 이론적 배경이 완성되지 않은 때에 탄생한 언어이기 때문에 함수형 패턴으로 프로그램을 작성하는 것이 거의 불가능하다. 이는 C언어의 정신을 계승했다고 볼 수 있는 C++과 Go에서도 이어져 이런 언어들에서는 절차형으로 프로그램을 작성하는 것이 가장 깨끗하며 함수형으로 작성하는 것이 불가능하지는 않지만 상당히 불편하다.

그러나 현재 가장 많이 사용되는 언어들 중에는 멀티 패러다임 언어들이 다수 있다. 가장 대표적인 멀티 패러다임, 약타입 언어이자 세계에서 가장 많이 사용되는 언어들이기도 한 JavaScript와 Python은 프로그래머에게 무한한 자유를 제공한다. 클로저, 클래스, 변경 가능한 약타입 값들, 리스트와 레코드, side effect 가득한 모듈 구조 등 두 언어는 서로 닮은 점이 상당히 많다. 상술했듯 이런 언어들에서 아무런 규칙 없이 코딩하다보면 알아보기 힘들고 유지보수하기 어려운, 소위 더러운 코드가 나온다. 많이 사용되는 언어들인만큼 하나의 정답을 이루기 위한 많은 방법들이 제시가 되었고, 이 글에서는 언어 외적인 규제, 즉 프로그래머 자신과 개발 팀에 의한 규제를 제외한 언어와 그 언어의 생태계가 하나의 정답을 추구하기 위해 제시하는 방법들을 소개한다.

## Typing

관대한 타입 시스템은 엄격한 타입 시스템에 비해 덜 장황하고 더 유연한 실행을 보장한다. 그러나 JavaScript는 TypeScript라는 강타입 슈퍼셋이 대인기를 끌고 있고, Python도 최근 3.8 버전 이상에서 type hint라는 기능을 추가했다. 언어는 사용자의 요구에 따라 변하기 때문에, 이런 타입 시스템들의 등장은 약타입 언어 사용자들의 엄격한 타입 시스템에 대한 수요가 상당하다는 것을 의미한다. 하나의 정답 관점에서 타입 시스템은 코드에 어떤 긍정적인 영향을 끼칠 수 있을까?

잘 정의된 타입 시스템은 그 자체로 다양한 정답의 가능성을 억제한다. 함수를 예로 들면, 파라미터의 개수 및 반환하는 값의 개수에 대해서 엄격하게 검사하지 않으면 다음과 같은 코드를 작성할 수 있다.

```python
def f(a, b=None):
  if b:
    return a + b, a - b
  return a
p, q = f(1, 2) # p=3, q=-1
r = f(5) # r=5
s, t = f(10) # runtime error
u = f(9, 8) # u=<tuple> -> potential error
```

```javascript
const f = (a, b) => {
  if (b !== undefined) {
    return [a + b, a - b];
  }
  return a;
};
const [p, q] = f(1, 2); // p=3, q=-1
const r = f(5); // r=5
const [s, t] = f(10); // runtime error
const u = f(9, 8); // u=<list> -> potential error
```

함수 `f`는 매개변수로 하나 또는 두 개의 값을 받는다. 반환형은 튜플이거나 단일 값이다. 이런 식으로 작성한 함수는 프로그래머에게 네 가지의 가능성을 주지만, 실제로 정답인 경우는 두 개 뿐이다. 두 기능을 별도의 함수로 작성하는 것에 비해 간결하냐 하면, 그것도 아니다. 두 번째 매개변수를 검사하는 조건문을 쓰는 것은 함수를 하나 더 쓰는 것과 비교해 그닥 간결하다고 할 수 없다. 엄격한 타입 시스템은 이런 모호한 함수의 작성을 차단하면서도 생산성을 잃지 않도록 할 수 있다. 예를 들어, 위 함수의 반환 값을 튜플로 고정하기만 해도 하나의 잠재적인 오답을 확정적으로 피할 수 있다.

```python
from typing import Optional

def f(a: int, b: Optional[int] = None) -> (int, Optional[int]):
  if b:
    return a + b, a - b
  return a, None
p, q = f(1, 2) # p=3, q=-1
r, _ = f(5) # r=5
s, t = f(10) # s=10, t=None -> potential error
u, _ = f(9, 8) # u=17
```

```typescript
const f = (a: number, b?: number): [number, number | undefined] => {
  if (b !== undefined) {
    return [a + b, a - b];
  }
  return [a, undefined];
};
const [p, q] = f(1, 2); // p=3, q=-1
const [r] = f(5); // r=5
const [s, t] = f(10); // s=10, t=undefined -> potential error
const [u] = f(9, 8); // u=17
```

여전히 좋은 코드라고 할 수는 없지만 호출 시 발생하는 런타임 에러는 모두 해결된다.

가장 좋은 코드는 매개변수를 하나만 받는 함수와 두 개를 받는 함수를 따로 작성하는 것이 되겠다. 현재의 코드는 반환되는 튜플의 두 번째 값이 nullable하기 때문에, 잠재적으로 오류를 일으킬 가능성이 매우 높다. 전술했듯 새로운 함수를 또 작성하는 것이 아주 장황하지 않기 때문에, 기능별로 함수의 이름을 명백하게 구분하는 것이 좋은 코드라고 할 수 있는 것이다.

이외에도 엄격한 타입 시스템은 아래 linting과 formatting시 검사기들에게 유용한 정보를 제공하곤 한다. 이는 아래의 AST 문단에서 알아본다.

## Linting

동사 lint에 대한 적절한 한국어 번역은 존재하지 않는 듯하다. 그리고 아래의 formatting과 비교했을 때 무엇이 linting이고 무엇이 formatting인지를 칼같이 나누기가 힘들다. 그래서 보통 코드에 끼치는 역할로 두 작업을 구분해야 한다.

linter는 코드 스타일을 강제하고 잠재적으로 에러가 날 만한 습관들을 잡아준다. linter는 단순히 코드 텍스트만을 보고 분석하지 않고, 실제로 컴파일러 또는 인터프리터가 코드를 읽는 방식과 아주 유사하게 코드를 읽어서 내부적으로 프로그램 전체 또는 함수, 객체들에 대한 추상적인 트리를 구성한다. 그러나 코드를 실제로 수행하지는 않는데, 이 과정만 거쳤을 때 결과물로 나오는 것이 AST이다. AST는 linter의 동작 방식을 이해하는 데 필수적이다.

### AST

AST는 abstract syntax tree의 줄임말로 추상 문법 트리 정도로 번역할 수 있겠다. 우리가 실제로 작성하는 코드는 그냥 syntax, 혹은 더 특수한 표현으로는 concrete syntax라고 할 수 있다. 다양한 concrete syntax도 하나의 abstract syntax를 결과물로 낼 수 있다. 예를 들어, 덧셈을 `Add`, 숫자를 `Number`라는 추상 문법으로 나타낸다면, 아래 코드들은 모두 `Add(Number(1), Number(2))`와 동일하다.

<!-- prettier-ignore -->
```typescript
1 + 2
1 + 2;
(1 + 2)
1+2
```

linter는 AST를 구하고 그 AST를 각종 규칙을 통해 검사하며 규칙에 어긋난 코드가 있는지 검사한다. JavaScript/TypeScript의 사실상 표준 linter인 [eslint](https://eslint.org/) 규칙들 중 React 훅 API 관련 코드를 lint하는 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 패키지는 React 공식 도큐멘테이션의 [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) 페이지에 있는 규칙들을 개발자가 준수하고 있는지를 철저하게 검사한다.

훅이 함수형 컴포넌트 또는 또다른 훅 안에서 최상위 레벨에서만 사용된다는 사실을 어떻게 알 수 있을까? AST를 구하고 나면 일차적으로 이런 함수들을 훅으로 판단할 수 있을 것이다.

1. 함수들 중
2. React에 정의된 훅 또는 훅으로 판단된 함수를 호출하면서
3. JSX Element가 아닌 값을 반환하는(함수형 컴포넌트가 아닌) 함수

이제 훅을 모두 판단했다면, 훅의 첫 번째 규칙인 "최상위에서 훅을 호출할 것"을 지키고 있는지는 다음과 같이 판단할 수 있을 것이다.

1. 함수들 중
2. 훅이거나 JSX Element를 반환하는 함수(함수형 컴포넌트)들 중
3. 훅을 호출하는 문법이 있다면
4. 그 문법이 함수의 AST의 최상위 레벨에 있을 것 - 즉, 조건문, 반복문, 함수 호출문 등의 하위에 존재하지 않을 것

만약 AST가 위 검사에서 문제를 발견한다면, linter는 설정에 따라 경고 또는 에러를 발생시킬 것이다. 위와 같이 AST를 동반한 코드의 분석은 가독성뿐만 아니라 패턴 통일성, 성능, 언어와 패키지 등의 올바른 사용에까지 영향을 미친다.

### TypeScript & ESLint AST

약타입 AST와 강타입 AST를 비교하면 강타입 AST가 더욱 풍부한 정보를 제공할 수 있음은 자명하다. ESLint도 TypeScript의 AST를 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)라는 프로젝트로 사용할 수 있게 되면서 코드를 더욱 면밀히 분석하고 더 좋은 패턴들을 많이 강제할 수 있게 되었다. 좋은 패턴이라 함은 프로그래머가 더욱 세밀하게 타이핑하도록 강제하는 것(no-explicit-any 등)뿐만 아니라 타입 분석을 통해 알 수 있는 정보를 기반으로 프로그래머의 행동을 강제하는 것(naming-convention 등)들도 있다.

### PyLint

Python도 여러 linter 패키지들을 가지고 있다. 이 중 [PyLint](https://pypi.org/project/pylint/)는 많이 쓰이기도 하고 매우 폭넓은 설정을 제공한다. Python 3.8 이상의 type hint 기능을 내부적으로 어떻게 사용하고 있는지는 모르겠으나, 타입 검사 기능 없이도 충분히 훌륭한 코드 검사기이다.

## Formatting

formatting은 번역하면 형식에 맞도록 변환 쯤이 될 것 같은데, 그냥 포매팅으로 쓰도록 하겠다. 포매팅은 추상 문법보다 실제로 쓰여진 코드의 텍스트가 어떤 스타일로 적혔는지에 집중한다. 예를 들어 세미콜론을 썼는지 또는 안썼는지, 화살표 함수의 매개변수를 괄호로 감쌌는지, 조건문의 결과가 한 줄일때 블럭을 중괄호로 감쌌는지, 각 줄의 코드 길이가 가로로 100자를 넘겼는지 등을 검사한다.

JavaScript/TypeScript 포매터로는 많은 사랑을 받는 [Prettier](https://prettier.io/)가 있다. JS/TS/JSON/YAML/MD 등의 파일을 포매팅할 수 있으며, 아무 설정 없이도 꽤 예쁜 결과물을 낸다. Python은 [autopep8](https://pypi.org/project/autopep8/)이라는 자동 포매터가 많이 쓰이는데, 최근에 내가 주목한 것은 [black](https://github.com/psf/black)이라는 포매터이다. 설정할 여지가 거의 없지만 일반적으로 받아들이기 쉽고 예쁘게 코드를 포맷해줄 뿐만 아니라 오히려 하나의 정답에 가깝게 코드를 고쳐주는 느낌이다.

# Typing, Linting & Formatting for Others

하나의 정답은 나와 동료들을 위해 필요하다. 특히 동료들에게는 유지보수하는 것보다 훨씬 자주 일어나고 귀찮은 상황이 있는데, 바로 남이 쓴 코드를 리뷰할 때이다. 내가 쓰는 패턴과 완전히 다른 코드를 들고 오면 그게 좋은 코드인지 안좋은 코드인지를 떠나서(심지어 안좋은 코드일 경우가 훨씬 많다) 리뷰하기가 힘들어지고, 면밀한 리뷰 없이 마스터에 들어간 코드는 언제 버그를 일으켜도 이상하지 않은 상태가 된다. 그래서 리뷰에 들어가기 전에 typing, linting과 formatting을 마쳐서 최소한 리뷰자와 리뷰받는자의 정답을 보는 관점을 통일해야 원활한 리뷰가 가능하다.

## pre-commit hook

먼저 git commit을 하기 전에 변경된 파일들을 검사하는 pre-commit hook을 사용할 수 있다. node 사용자들은 [lint-staged](https://github.com/okonet/lint-staged)를 통해 로컬 저장소에 훅을 걸 수 있다. pre-commit이라 함은 commit 전에 해당 훅을 수행하도록 하며, 만약 훅 스크립트에서 종료 코드가 0이 아닌 에러가 발생한다면 commit을 취소한다. lint-staged를 잘 세팅하면 staged된 파일들에만 해당 작업들을 수행할 수 있다.

## CI

CI는 리모트 저장소에 코드를 push했을 때 검사를 진행한다. GitHub이나 GitLab등의 리모트 저장소들은 CI를 통한 체크가 통과했을 때만 코드를 합치는 등의 설정을 할 수 있다. 이 때는 가급적이면 staged된(혹은 변경된) 파일들뿐만 아니라 전체 코드에 대해 검사를 진행하는 것이 좋다. 왜냐하면 부분적으로는 옳지만 전체적으로는 틀린 경우들이 분명히 있고, CI가 돌아가는 시간은 commit이 대기하는 시간보다는 덜 부담스럽기 때문이다.

# 정리

내가 아주 초보적인 JavaScript/NodeJS 개발자였을 때(TypeScript v2가 나오기 전), 어떤 node 스크립트를 큰 프로젝트에 커밋하면서 시니어분에게 코드 리뷰를 받을 기회가 생겼었다. for문으로 객체 순회, async/await와 Promise 혼용, side effect로 점철된 함수들 등 지금 내가 리뷰하라고 하면 바로 PR 닫을 정도의 쓰레기 코드였지만 시니어분께서 자비롭게도 지속적으로 리뷰해주셔서 결국 머지할 수 있었다. 그 때 가장 먼저 달렸던 코멘트가 "혹시 eslint 안쓰시나요?"였다. 나는 그 때 linter를 처음 알았고, eslint를 돌리자마자 수많은 에러가 튀어나왔다. 이 일 이후로 나는 linter와 포매터 설정을 충돌이 없는 한에서 가장 강하게 쓴다. 그것이 나뿐만 아니라 내 코드를 읽을 동료들 또는 시니어들에게 예의라고 생각하기 때문이다.

나와 내 동료들을 위해 하나의 정답을 추구하자. JavaScript 개발자들은 TypeScript/eslint/prettier/lint-staged를 습관화하고, Python 개발자들은 pylint/black을 습관화하자. 하나의 정답에 가까워질수록 스스로도 코드를 읽고 이해하기 쉬워질 것이고, 동료들의 생산성 또한 높일 수 있을 것이다.

[^1]: 이를 튜링 동치(Turing equivalence)라고 한다. 절차형과 함수형 패턴은 서로 튜링 동치임이 증명되었고, 객체지향형은 절차형의 부분집합으로 볼 수 있다. HTML, CSS, 마크다운과 같은 언어들은 위 패턴을 지원하는 일반적인 프로그래밍 언어들과 튜링 동치일 수 없다.
