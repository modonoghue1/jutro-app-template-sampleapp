import hoistStatics from"hoist-non-react-statics";export const createHOC=config=>{const ComponentToWrap=config.component,Wrapper=config.wrapper,displayName=config.displayName,WrappedComponent=Wrapper(ComponentToWrap,{...config.wrapperParams});return WrappedComponent.displayName=displayName||`${Wrapper.name||"Wrapper"}(${ComponentToWrap.displayName||ComponentToWrap.name})`,WrappedComponent.WrappedComponent=ComponentToWrap,ComponentToWrap.propTypes&&(WrappedComponent.propTypes=ComponentToWrap.propTypes),ComponentToWrap.defaultProps&&(WrappedComponent.defaultProps=ComponentToWrap.defaultProps),hoistStatics(WrappedComponent,ComponentToWrap)};