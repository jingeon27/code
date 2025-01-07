// ReactClone의 핵심 기능 구현 (함수형 컴포넌트 지원)
const ReactClone = {
  root: null, // 렌더링할 DOM 요소
  components: [], // 렌더링할 컴포넌트들

  render() {
    if (this.root) {
      this.root.innerHTML = ''; // 기존 내용을 지운 후
      this.components.forEach(component => {
        this.root.appendChild(component.render());
      });
    }
  },

  createElement(type, props, ...children) {
    if (typeof type === 'function') {
      const instance = type(props || {});
      instance.props = props || {};
      instance.props.children = children;
      return instance;
    }

    const element = document.createElement(type);
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  },

  setRoot(rootElement) {
    this.root = rootElement;
    this.render(); // 최초 렌더링
  },
};

// useState 훅 구현
function useState<T>(initialValue:T) {
  let state = initialValue;

  const setState = (newValue:T) => {
    state = newValue;
    ReactClone.render(); // 상태가 변경되면 렌더링을 다시 수행
  };

  return [state, setState];
}