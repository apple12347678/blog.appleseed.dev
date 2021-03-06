---
title: 일주일만에 Rust에 매료되다
date: 2021-01-03T14:14:00.837Z
description: 개발자들에게 가장 사랑받는 언어를 써 본 후기
tags:
  - rust
---

가장 사랑받는 프로그래밍 언어 [Rust](https://www.rust-lang.org/)[^1]는 태생부터 축복받은 아이였다. Google의 Go나 Apple의 Swift만큼 대단한 집안에서 태어나지는 않았지만, Rust의 초기 개발자들은 엄청나게 똑똑했고, 동시에 코드의 실질적인 사용성에 대해서도 많은 고민을 하는 사람들이었다. Rust의 독보적이고 혁신적인 컨셉은 공개 후 얼마 지나지 않아 많은 프로그래머들의 이목을 끌었고, 코어 기능들의 구현이 완료되어갈 즈음에 대기업들과 커뮤니티의 적극적인 참여로 언어의 생태계도 안정화 단계에 접어들었을 뿐더러 굵직한 Rust 프로젝트들이 생겨나기 시작했다.

필자는 Rust의 컨셉을 보자마자 이 언어는 앞으로의 개발 패러다임을 완전히 바꿀 것이라고 확신했다. 그래서 1년 전에 Rust를 배우려고 시도했지만 튜토리얼의 3페이지도 지나지 못해 포기할 수밖에 없었다. 기존에 사용하던 프로그래밍 언어들과 너무나도 다른 접근 방식 때문에, 배운 내용만을 가지고 내가 짜고 싶은 프로그램의 10%도 구현하지 못했다. 더이상 튜토리얼에서 헤매는 것은 의미가 없다고 생각하고 관뒀던 내가 다시 이 언어로 돌아온 것은, 몇 가지 언어와 그 언어에서 사용되는 개념들에 대해 많이 배울 수 있었고, 배운 후에는 Rust도 이해할 수 있을 거라는 확신이 있었기 때문이다.

결과적으로 나는 Rust를 이용해 실제로 사용할 수 있는 소프트웨어를 만드는 데 성공했고, 앞으로 Rust의 사용에 대해 매우 긍정적이다. 1년 전과 비교하여 지금은 언어 자체와 언어의 생태계가 충분히 성장했다고 생각한다. 앞으로 내가 어떤 소프트웨어를 기획하든 - 심지어 필자의 주 개발 분야인 프론트엔드는 JS 사용이 강제에 가까움에도 - 나는 Rust를 구현을 위한 최우선 선택지 중 하나로 고려할 것이다.

# About Rust

Rust는 모질라 재단에서 연구 목적으로 개발되던 언어이다. 발표 당시 사람들이 경악했던 점은 이 언어가 **컴파일 타임 메모리 안전성**을 언어 차원에서 보장한다는 점이었다. C/C++에서의 지옥같은 malloc/free도 없고, 쓰레기 수집을 위한 런타임 오버헤드도 없이 메모리 안전성을 달성한 Rust는 코드 퀄리티와 성능 두 마리의 토끼를 잡을 수 있는 대안으로 떠오를 것으로 보였고, 현재는 몇 가지 거대한 프로젝트들이 성공적으로 Rust로 작성되었으며 이러한 컨셉의 언어는 아직까지 없으므로 Rust의 앞날은 아직도 밝다.

## Academy vs Industry

Rust에 대해 본격적으로 이야기하기 전에, 프로그래밍 언어 그리고 그 밖의 많은 기술들에서 항상 논쟁거리가 되는 *학술적 완성도와 산업적 완성도 사이의 타협*에 대해 간단히 언급하겠다. 기술은 대부분 학계에서 개발되어 산업계에서 사용된다. 기술이 학계에서 논의되는 시기와 산업계에서 활발히 사용되는 시기에는, 전산학은 변화에 관대한 편이라 그 기간이 짧기는 해도 분명히 차이가 있을 수밖에 없다. 가장 학술적인 언어의 일종인 Haskell은 프로그래밍 언어 학계에서 유용하다고 여겨지는 함수형 언어의 여러 기능들 - 지연 평가, 커링, 모나드 등 - 을 오래전부터 구현하고 있었지만, 해당 기능들을 완전히 이해하고 사용할 수 있는 개발자를 찾는 것은 매우 어렵다. 익명 함수와 비동기 코루틴 같이 이해도 쉽고 효용성도 높은 기능들은 산업계의 눈길을 끌면 얼마 지나지 않아 대부분의 주류 언어에서 구현되곤 한다. 자신이 주로 사용하는 언어가 익명 함수와 비동기 프로그래밍을 지원한지 얼마나 됐는지 알아보는 것도 좋다. Java는 JDK 8부터 익명 함수를 지원했고, Python은 3.7부터 async/await문을 지원하기 시작했다.

Rust는 이러한 측면에서 두 진영 사이의 타협점을 절묘하게 찾았다고 생각한다. Rust의 기능들과 문장들은 학계 쪽에 가까운 함수형, 강타입형 언어들의 것과 Rust가 대체할 산업계의 분야의 주류 언어들의 것을 적절히 섞어놓은 것에 가까우면서, 이들의 장점을 최대한 가져가려고 노력한 것이 보인다. 예를 들면, 대수적 데이터 타입인 variant, trait 기반 다형성이나 패턴 매칭 등의 기능은 주류 언어에는 없지만 Scala 등의 학술적 언어에서는 적극적으로 사용되는 기능이고, 참조를 전달하여 데이터의 복사 없이 그 값들을 사용하는 패턴은 C/C++에서는 지겹도록 보는 프로그래밍 스타일이다. 그러면서 언어 자신만의 장점과 혁신적인 컨셉들을 자연스럽게 녹여낸 것이 놀라울 따름이다.

## Agenda

Rust가 해결하고자하는 문제는 명확하다: C/C++의 시스템 프로그래밍 언어로서의 독점적 지위를 대체하는 것이다. 따라서 Rust는 컴파일 언어이며, 아키텍쳐와 플랫폼에 따라 다른 바이너리를 생성하고, 해당 바이너리는 추가적인 런타임 없이 바로 실행될 수 있다; 즉, 쓰레기 수집 등 언어의 특정 기능으로 인한 런타임 오버헤드가 아예 없다. 그렇기 때문에 Rust의 언어적 특성들은 모두 zero-cost이다: zero-cost 메모리 관리, zero-cost 추상화 등. 최소한 쓰레기 수집 정도는 언어 런타임에서 지원하는 것이 사실상 표준인지라, 네이티브한 성능을 얻기 위해서는 C, C++과 Rust 외에는 사실상 선택지가 없다. C#, Java 및 Java 패밀리, Python, JavaScript 및 JS 패밀리, Go, Ruby 등 필자가 생각할 수 있는 언어들 중 저 셋을 제외한 언어들은 모두 코드를 돌리기 위한 별도의 런타임을 필요로 한다.

## Prerequisities

Rust는 첫 번째 프로그래밍 언어로는 최악이다. 간단한 작업을 하기에도 너무나도 많은 제약과 프로그래밍 언어적 지식들이 요구된다. 전술했듯이 필자 역시 처음 Rust를 배우려고 시도했을 때 한 번 실패했었고, 다른 여러 언어들을 다뤄보고 난 후에야 문법을 학습하기 위한 시간을 단축하여 실제로 사용할 수 있는 코드를 작성하기 시작할 수 있었다. 그 중에서도 가장 영향을 많이 줬던 언어는 Scala인 것 같다. Rust는 함수형 언어는 절대 아니지만, 그 타입 시스템은 함수형 언어들의 견고한 타입 시스템들을 많이 닮아있다. 조건문, 반복문, 예외 처리문 등의 흐름 제어문을 적극적으로 사용하는 C/C++에 비해 Rust에서는 패턴 매칭을 이용한 분기, 순환자(iterator)를 이용한 순회, `Option<T>`, `Result<S, T>` 등의 제네릭 타입들을 이용한 에러 처리가 일반적이다. 또한 모든 문장이 값을 가지고 있으며, 분기된 가지들이 모두 같은 타입을 가지는 것이 매우 중요하다. 이러한 모든 특징이 Scala의 타입 시스템과 너무나도 유사했기 때문에, 두 번째로 만난 Rust의 문법들은 생소하기보다 반가웠다.

## Compile-Time Memory Safety

Rust가 많은 프로그래머들의 관심을 끌 수 있었던 가장 큰 이유는 바로 이 언어로 작성되어 컴파일된 코드는 **절대 메모리 누수를 일으키지 않는다**는 것이었다[^2]. 경쟁 언어인 C/C++에서 메모리의 할당과 해제는 프로그래머에 의해 직접 이루어지고, 만약 메모리 사용 후 제때 해제하지 않는다면 메모리 누수가 발생하는 것이 너무나도 쉬웠기에 C/C++에서 메모리 오류는 프로그래머들을 영원히 괴롭히는 존재였다. 기타 언어들의 경우 쓰레기 수집을 통해 이를 해소하려 했는데, 이는 런타임 오버헤드를 유발하므로 시스템 프로그래밍 언어로서 좋은 특성이 아니다. Rust의 컴파일러는 논리적으로 메모리가 할당되거나 사용 완료되었어야 할 시점을 전부 파악하고 알맞은 자리에 할당문과 해제문을 삽입한다. 이 할당/해제 시점을 컴파일 타임에 파악할 수 있도록 해주는 이론적 배경이 **소유권(ownership)**이다.

### Ownership

`Object`라는 이름의 객체 인스턴스가 변수 `var`에 담겨 있다면, 거의 모든 프로그래밍 언어에서 이는 `var`이 힙에 할당된 `Object`를 가리키는 참조를 들고 있음을 의미한다. 그리고 메모리 누수는 예외 없이 이 참조가 사용 중이 아님에도 힙에 할당된 `Object`가 해제되지 않았을 때에 발생한다. 이 참조가 또다른 함수, 스레드 등에서 사용중이라면 이 영역이 사용중인지를 판단하는 것은 거의 불가능에 가까우며, 이것이 2020년도에도 시스템 프로그래머들이 메모리 문제와 사투를 벌이고 있는 이유이다. Rust는 이러한 참조의 이동을 극도로 제한하는 형태의 타입 시스템을 제안했으며, 그 결과로 참조에 접근이 가능한 스코프를 나가는 순간 해당 참조에 묶인 메모리를 안전하게 해제할 수 있게 되었다. 소유권 개념은 이 참조의 이동에 대해서 컴파일러가 면밀하게 추적할 수 있게 해준다. 참조를 다른 함수, 스레드에서 접근할 경우 이 참조는 원래의 참조와는 다른 타입과 권한을 가지며, 이렇게 부분적으로 참조를 옮기는 것을 참조 빌리기(reference borrowing)라고 한다.

#### Borrowed Reference

빌린 참조(borrowed reference)는 `&` 연산자로 만들 수 있으며, 익숙한 사람들은 C/C++에서의 포인터 연산자를 떠올릴 것이고 실제로 그 기능도 유사하다. 빌린 참조는 원래의 참조가 해제되기 전에 무조건 반납되어야 한다. 따라서 해당 변수의 스코프를 나가서도 해당 객체에 계속 접근하려고 하면 접근하려고 하는 함수, 스레드에 소유권을 이전해야만 한다. 특수한 경우가 아니면 빌린 참조만으로 충분한 작업들이 대다수이며, 소유권을 계속 이전하는 것은 메모리 사용 후 바로 해제를 추구하는 Rust의 프로그래밍 패턴에 맞지 않는다. 분명 빌린 참조에도 한계가 있기 때문에 프로그래머는 복잡한 객체를 넘길 때에는 빌린 참조, 소유권 이전, 그리고 후술할 값을 복사한 새 참조 생성 중에서 적절히 저울질해야 한다.

### Lifetime

소유권이 명백한 객체는 그 스코프가 할당과 해제를 정의할 수 있으며, 이는 해당 객체의 수명(lifetime)을 정의한다. 수명은 일반적으로 컴파일러가 알아서 판단할 수 있지만, 객체가 복잡한 참조 관계를 가진 경우 그 객체의 수명을 일률적으로 판단하기 힘든 경우가 있다. 예를 들어 `Person` 객체의 `name` 멤버는 다른 멤버들과 다르게 정적인 문자열로서만 정의하여 프로그램의 종료시까지 접근 가능한 참조로서 유지하고 싶은 경우[^3]에도 `name`의 수명은 컴파일러에 의해 `Person`의 것과 같게 판단되는 일종의 오류가 발생할 수 있다. Rust는 마치 타입 변수를 사용하듯이 수명을 변수로서 제공할 수 있다. 타입 매개변수와 다르게 수명 변수는 앞에 `'`를 붙여 구분한다. 앞의 `Person` 객체가 객체 자신과 같은 수명의 `family`라는 `Person` 타입 배열을 가지고 정적 문자열 `name` 멤버를 가진다면, `Person<'a>`는 `family: Person<'a>`와 `name: 'static str`로 각 멤버의 수명을 다르게 설정할 수 있다. 아래는 필자가 작성중인 백엔드 코드의 일부분인데, `NewResource` 객체들의 나머지 멤버와는 다르게 `is_file` 멤버는 원시 타입의 일종인 `bool` 타입으로 수명을 가질 필요가 없으므로 수명 매개변수를 상속받지 않고 있다.

```rust
struct NewResource<'a> {
    pub parent: Option<&'a str>,
    pub owner: &'a str,
    pub name: &'a str,
    pub is_file: bool,
}
```

### Mutability

객체의 소유권을 철저히 관리하는 만큼 가변성(mutability) 또한 일반적으로는 극도로 제한된다. 모든 변수는 기본적으로 불변이며, 가변 변수는 `mut` 키워드를 붙여 컴파일러에게 알려야 한다. 가변 객체는 빌린 참조, 수명, 부수적 효과(side effect), 비동기 프로그래밍 및 멀티스레드 프로그래밍 등 모든 면에서 일을 복잡하게 만든다는 것 때문에 일부 프로그래밍 진영에서는 사실상 금기시되고 있던 것을 언어의 컨셉으로서 받아들인 것이다.

`mut` 변수는 선언하는 순간 위에서 언급한 모든 안좋은 효과들을 끌고 온다. 그렇기 때문에 `mut` 변수는 일반 변수보다 훨씬 많은 제약을 가지고 있다. 가변 빌린 참조는 최대 하나만 생성 가능하며, 일반적으로 멀티스레드 장벽을 넘나들 수 없다. 타 언어들에 비해 제약이 훨씬 강하지만, Rust는 이러한 조건들을 통해 컴파일 타임에 완전한 메모리 안전성을 달성할 수 있다.

## Trait Based Polymorphism

산업적으로 사실상 최초로 다형성(polymorphism)을 도입한 Java는 클래스와 상속을 통한 다형성을 제시했다. 다형성은 프로그램들의 재사용성과 표현성을 크게 향상시킬 수 있었기에 그 개념은 언어의 유행을 따라 빠르게 프로그래밍 산업계에 전파되었다. 이후 제네릭이라는 타입 매개변수 개념이 등장했고, 각 언어들은 Duck typing 기반 느슨한 다형성, 함수 매개변수의 타입 추정을 이용한 매개변수 다형성 등 각 언어들의 용도에 맞는 다형성을 구현했다. trait 기반 다형성은 객체 기반 다형성의 연장선이지만 지향하는 바는 상속을 통한 다형성과는 차이가 크다. 필자는 trait 기반 다형성의 경우 Scala에서 처음 사용해봤는데, 표현성과 타입 안정성이 굉장히 뛰어나다는 인상을 받았었다.

Rust의 trait 기반 다형성의 핵심은 **trait는 오로지 동작만을 정의**하고, 객체의 멤버는 구조체(struct)에만 정의된다는 것이다. 이는 Python에서 순회 가능한 객체를 만들기 위해서 `__iter__` 메소드를 구현한다거나, 객체를 문자열로 표현하기 위해 `__repr__` 메소드를 구현하는 패턴과 매우 유사하다. Rust에서 순회 가능한 객체를 만들기 위해서는 `Iterator` trait를 구현하면 된다: `impl Iterator for Object`. Python의 매직 메소드에 비해 trait를 구현하는 것은 확장성이 훨씬 크고, 타입 안전하며, 대부분의 경우 별도의 코드 작성 없이 쉽게 객체에 원하는 특성들을 부여할 수 있다.

### Standard Library Traits

몇 가지 재미있는 기본 trait들을 소개하고자 한다. 먼저 소개했던 `Iterator` trait는 그 이름이 표현하고 있듯이 반복 가능한 객체를 생성하는 객체들이 상속받는다. 배열인 `Vec`이나 키값 쌍을 저장하는 `HashMap` 등은 이 `Iterator` trait를 상속받는다.

비동기 프로그래밍에도 강한 Rust는 `Future<T>` trait를 통해 해당 객체의 값이 당장 반환되지 않고 해당 객체를 소유한 코루틴의 종료 이후에만 조회할 수 있음을 나타낸다. TypeScript 프로그래머들이라면 `Promise<T>` 타입과 사실상 같게 생각해도 되며, async/await 함수의 반환값으로 취급 가능한 등 그 동작또한 아주 유사하다.

옵저버블, 비동기 제네레이터 등으로 표현되는 반복 가능한 비동기 객체는 `Stream<T>` trait를 통해 구현할 수 있다. 해당 trait를 구현한 객체들은 비동기적으로 반복할 때마다 `Option<T>` 객체를 내보내며, `None`으로 객체가 모두 반복되었음을 나타낸다. 옵저버블이나 비동기 제네레이터들처럼 동시 실행, race 등으로 묶는 것도 가능하다.

객체의 스레드 안전성 또한 trait를 상속함으로써 달성할 수 있다. `Mutex` trait, `Arc`(atomic reference counting) trait 등을 참조하자. 여기에서 자세히 다루지는 않겠지만, OS나 비동기 시스템 프로그래밍을 해봤다면 익숙한 개념들일것이다.

## Variants

대수적 데이터 타입인 variant 또한 최근에 차용되기 시작한 개념으로 다양한 형태의 값을 하나의 타입으로 엮어 표현할 수 있게 해주며, 패턴 매칭을 통해 해당 variant가 가진 데이터를 안전하게 추출할 수 있다. 기본적으로 정의된 variant들도 매우 유용할뿐만 아니라 `enum` 키워드를 이용하여 사용자 정의 variant를 선언할 수 있다.

### Built-in Variants: Option and Result

타입 안전한 에러 처리를 위한 `Option<T>`와 `Result<S, T>`는 오류와 함께 종료될 수 있는 함수의 반환값을 감싼다. `Option<T>`는 `Some<T>` 또는 `None`이며, `None`은 값이 없음을 의미한다. 예를 들어 `HashMap`에서 없는 키 값으로 검색을 한 경우 `None`이 반환될 수 있다. `Result<S, T>`는 `Ok<S>`이거나 `Err<T>`이며, `Ok`는 기대한 값이 반환된 것을, `Err`는 특정 에러 객체와 함께 코드가 비정상적으로 종료되었음을 뜻한다.

### Pattern Matching

패턴 매칭은 variant뿐만 아니라 각종 변수들을 조건에 따라 분기시킬 수 있다. 사실상 destructuring을 지원하는 switch-case 문이라 봐도 무방하다. 필자는 이 문법 역시 Scala에서 처음 만났고, 아주 적극적으로 사용했었다. 아래는 `Stream` 타입의 순환자를 async 함수 안에서 계속 순회하며 패턴 매칭으로 오류가 발생했는지 확인하는 코드의 일종이다.

```rust
while let Some(chunk) = field.next().await {
    match chunk {
        Ok(data) => {
            body_sender.send(Ok(data)).await.unwrap();
        }
        Err(error) => {
            body_sender.send(Err(Error::new(ErrorKind::Other, error)))
                .await.unwrap();
        }
    }
}
```

## Asynchronous Programming

Rust는 타입 안전, 메모리 안전한 비동기 프로그래밍을 지향한다. 기존의 패러다임처럼 `Mutex`나 `Arc`를 이용하여 스레드들간의 동기화된 상태를 가지고 여러 스레드를 굴릴 수도 있지만, 대세는 무상태(stateless)의 코루틴을 non-blocking하게 굴리는 쪽으로 넘어갔다. Rust는 최근에 async/await 문법을 안정화 버전에 포함했고, Future trait를 구현한 객체들을 굴리는 코루틴을 지원하고 있다. futures나 tokio 등의 모듈들을 사용하면 비동기 코루틴의 장점을 더욱 풍부하게 사용할 수 있다.

### async/await

async/await 키워드는 JS(ES7+)나 Python의 그것과 아주 유사하다. async 함수 내에서는 await를 쓸 수 있고, async 함수들은 non-async 함수들에서 `Future`를 반환하는 함수로서 취급된다. 프로그래머는 문맥에 따라 async/await을 깊게 체이닝하거나, async 함수로부터 반환된 `Future`를 polling하여 비동기 프로그래밍을 달성할 수 있다.

## Hygenic Macro

Rust의 매크로는 그닥 주목받는 기능은 아니지만 언어의 정체성을 만들어내는데 큰 역할을 하고 있다고 생각한다. 그 형태는 C/C++의 전처리기에 의해 처리되는 매크로와 유사하지만, 컴파일러가 직접 해석하며 네임스페이스와 타입에 대한 정보를 가지고 해석되기 때문에 의도치 않은 코드와의 충돌을 방지한다. 이런 형태의 매크로들을 하이지닉 매크로라고 부른다.

매크로로 선언된 함수들은 함수 이름의 맨 뒤에 `!`이 붙는다. `assert_eq!()`와 같은 형태이다. 매크로 함수 외에도 매크로는 코드의 linter에게 정보를 제공하는 역할, 타 언어의 데코레이터로서의 역할, 메타 프로그래밍의 역할 등 수많은 확장성을 제공한다. Rust 구조체의 데이터를 다른 형태의 데이터로 변환하거나 역변환하는 serde 모듈은 구조체를 매크로로 태깅하기만 해도 해당 구조체를 JSON이나 YML 등의 데이터로 변환, 역변환하는 코드를 자동으로 생성한다.

```rust
use serde::Serialize;

#[derive(Serialize)]
struct PingResponse {
    message: &'static str,
}
```

## Type Soundness

Rust는 필자가 사용해 본 언어들 중 단연코 가장 뛰어난 타입 안전성을 제공한다. 프로그래머가 코드를 작성할 때 프로그램에 제공하는 모든 형태의 정보 - 타입뿐만 아니라 소유권, 가변성, 수명, 에러로 인한 비정상적인 종료까지 모두 타입 시스템의 관리 하에 있으며, 덕분에 Rust의 타입 시스템을 통과하여 컴파일된 프로그램은 강제로 패닉을 유도하지 않는 이상 런타임 오류에 거의 완전히 면역이라고 할 수 있다.

풍부한 타입 정보는 프로그램의 안정성을 올려줄뿐만 아니라 개발 단계에서도 각종 유용한 정보들을 제공한다. 함수의 매개변수와 반환 타입을 미리 정의해놓고 함수를 작성하면 모든 조건 분기의 끝에서 해당 타입을 반환할 때까지 타입 시스템이 해당 부분들을 지적해주므로 훨씬 편하게 함수를 구현할 수 있다.

# Rust Ecosystem

Rust 생태계는 아직 성장중이다. 하지만 근간이 되는 패키지들의 작성은 안정화 단계에 접어들었고, 이를 활용한 큼직한 프로젝트들이 성공적으로 사용되는 중이다.

## Crate

crate는 Rust에서 일련의 코드의 집합을 통틀어 칭하는 하나의 단위이다. NodeJS나 Python의 패키지와 아주 유사하다. 하나의 엔트리포인트 코드, 주로 `main.rs`를 기점으로 분기된 Rust 코드 파일들이 `mod` 키워드로 연결되어 하나의 crate를 구성한다. 파일로 분기한 경우에는 해당 파일명을 그대로 쓰면 되고, 디렉토리로 분기한 경우에는 `mod.rs` 파일 안에 해당 하위 디렉토리 안의 모듈들을 전부 기술하면 된다. NodeJS의 `index.js`나 Python의 `__init__.py`와 유사하다.

접근 제한자는 `pub` 하나로, 함수, 구조체, trait 등 모듈 밖에서 접근할 수 있는 모든 코드는 `pub` 키워드로 태그되어야 한다. `mod` 자체도 crate 내의 상위 디렉토리에서 사용되기 위해서는 `pub` 키워드로 태그되어야 한다. 해당 키워드로 crate 밖에서도 접근할 수 있는 코드와 밖에서는 접근이 불가능한 코드를 구분할 수 있다.

## Cargo

cargo는 crate를 관리하는 프로그램이다. crate의 루트 디렉토리에 있는 `Cargo.toml` 파일로 해당 프로젝트가 사용하고 있는 crate들과 프로젝트에 대한 정보를 기술한다. 버전만 쓰는 경우 일반적으로 [crates.io](https://crates.io)에 있는 레지스트리를 기준으로 패키지들을 다운받으며, 레지스트리를 링크로 직접 지목할 수도 있다. 다른 패키지 매니저들과 유사하게 모든 의존성 트리를 저장하는 `Cargo.lock` 파일 역시 생성된다.

## Are we ??? yet?

"Are we sth yet?"이라는 사이트들은 Rust의 생태계가 sth 방면에서 얼마나 성숙했는지를 기록해놓는다. Rust를 개발한 모질라 재단 특유의 문화로 보인다. 필자는 웹 서버를 개발하기 전에 웹 서버를 Rust로 만드는 것이 가능한지가 의문이었는데, are we web yet 사이트에서 많은 도움을 얻어 Actix를 사용하기로 결정했었다. 몇 가지 사이트들을 여기에 소개한다.

- [are we async yet](https://areweasyncyet.rs/): Rust의 비동기 코루틴 및 부가 기능 개발 상태(완료)
- [are we web yet](https://www.arewewebyet.org/): Rust 웹 프레임워크 및 웹어셈블리 생태계
- [are we game yet](https://arewegameyet.rs/): Rust 게임 프로그래밍 생태계
- [are we learning yet](http://www.arewelearningyet.com/): Rust 머신러닝 생태계

해당 사이트들을 보면 대부분의 작업을 위한 근간은 거의 완성이 끝난 것으로 보인다. 개인적으로 기능과는 별개로 개발된 API들의 도큐멘테이션은 아직 매우 부족하다고 생각한다.

# What I've Made

필자는 Rust를 이용한 간단한 API 서버를 제작해 보았다. 튜토리얼을 따라 코드를 써보는 것보다 예시들을 조금씩 따라하며 이해해보려고 시도하는 것이 새로운 언어를 학습하는데 훨씬 효과적이라고 생각했기에 내가 선택한 crate들의 예시 레포지토리를 탐색하며 내가 필요한 기능들을 하나씩 조립해나갔다.

## Actix

[actix](https://actix.rs)는 Rust 백엔드 프레임워크 중 가장 다운로드 수가 많은 crate이다. 좀 더 자세히 알아보면 아픈 역사가 있는 프레임워크인데, 레딧에서 활발하게 개발되고 있던 중 책임 개발자가 코어에 unsafe 스코프를 사용한 것으로 논쟁이 붙었고, 이 때문에 코어 개발자가 유지보수를 포기하고 개발 자체가 장기간 중단되었다고 한다. 현재는 Rust 자체가 당시에는 unsafe했던 기능들을 안정화 버전에 많이 포함하였고 개발자들도 다시 코어 개발에 참여하기 시작하여 활발히 유지보수되고 있다.

쓰다 보면 애플리케이션의 형태는 여러 백엔드 프레임워크들을 써봤다면 쉽게 적응할 수 있다. App으로 시작하는 하나의 엔트리포인트와 비동기적으로 생성되는 코어 개수만큼의 worker들, 미들웨어, req를 매개변수르 받는 핸들러 등 NodeJS의 Express, Python의 Flask와 유사한 구조를 가지고 있다. 다만 Rust로 작성되었기에 그것들보다 조금 더 엄격하고, 타입 안전하고, 빠를 뿐이다. 현재까지의 사용 후기는 대만족이며, 기능이 부족하다고 생각해본 적은 없다.

## Serde

[serde](https://serde.rs)는 serialize-deserialize를 줄인 이름처럼 Rust 구조체의 다른 형태로의 변환, 역변환을 도와준다. `derive` 매크로 하나로 변환, 역변환 코드가 자동 생성되는 것은 지금까지 다뤄본 객체 전송 및 변환, 역변환 메커니즘들 중 단연 최고로 편리하고 타입 안전하다. 웹 요쳥과 응답을 처리하는 actix나 ORM인 diesel 모두 serde를 기반으로 작동한다. 필자는 극단적으로 serde 하나만으로도 Rust를 사용할 이유가 충분히 된다고 생각한다.

## Diesel

[diesel](https://diesel.rs)는 DB에 접근하기 위한 ORM이다. 가장 강력한 기능은 마이그레이션을 작성하고 실행하면 해당 마이그레이션으로 생성 또는 수정된 테이블의 Rust 객체를 자동 생성해준다는 것이다. 해당 객체는 매크로로 정의되어 각종 쿼리 DSL 및 유틸리티 함수들을 자동 생성하며, 이들은 가상화된 쿼리를 작성할 때 매우 편리하다.

단점은 아직 도큐멘테이션이 부족하다는 느낌이 강하고, PostgreSQL만을 일차적 목표로 지원하고 있기 때문에 타 DB를 사용할 경우 예상치 못한 문제를 만날 가능성이 높다는 것이다. 필자 역시 MariaDB에서 uuid 타입 문제로 어쩔 수 없이 PSQL로 메인 DB를 변경했다. 하지만 ORM으로서의 기본적인 기능들은 충실하게 작성되어 있어 사용에 큰 불편은 없다.

# 정리

이상 짧은 기간동안 Rust를 사용해보고 배운 것들과 느낀 점을 나열해 보았다. Rust는 언어 그 자체로도 프로그래머에게 많은 영감을 심어주고, 머리아픈 각종 런타임 에러로부터 자유롭게 해주며, 심지어 속도도 매우 빠르다. 필자는 앞으로 Rust가 개발 혁신을 가져올 것으로 확신하고 있으며, 이와 비슷한 컨셉의 언어들 또한 조만간 많이 등장할 것으로 예상하고 있다. Rust의 바람이 불어오면 프론트엔드 개발자들은 JS의 손아귀에서, 백엔드 개발자들도 Java의 손아귀에서 벗어날 수 있을까?

[^1]: [Stackoverflow Developer Survey 2020](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages)에서 Rust는 "가장 사랑받는 언어" 자리를 5년째 차지하고 있다.
[^2]: 일반적으로 쓰이지 않는 unsafe 스코프를 쓸 경우 메모리 누수를 일으킬 수는 있다.
[^3]: 프로그램 자체에 선언된 정적 문자열은 일반적으로 스택과 힙이 아닌 별도의 메모리 영역에 할당되어 프로그램의 종료 시까지 같은 참조로 접근할 수 있다.
