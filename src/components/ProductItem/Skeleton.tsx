import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    className="container"
    speed={0}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="306" rx="0" ry="0" width="280" height="0" /> 
    <rect x="0" y="0" rx="45" ry="45" width="280" height="260" /> 
    <rect x="0" y="270" rx="12" ry="12" width="280" height="81" /> 
    <rect x="4" y="362" rx="12" ry="12" width="280" height="53" /> 
    <rect x="7" y="437" rx="10" ry="10" width="100" height="27" /> 
    <rect x="121" y="428" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton;