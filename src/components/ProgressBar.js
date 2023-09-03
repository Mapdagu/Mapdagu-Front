import styled from 'styled-components';

const Bar = styled.div`
    width: ${(props) => props.width}%;
    height: 12px;
    background-color: ${(props) => props.color};
    border-radius: 1rem;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
        0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`

const ProgressBar = ({children, width, color}) => {
    return (
        <div>
          <Bar width={width} color={color}>
            {children}
          </Bar>
        </div>
      );    
}

export default ProgressBar;