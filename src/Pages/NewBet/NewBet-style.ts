import styled from 'styled-components/native'

interface NumberProps {
  bgColor: string
}

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
  padding: 0 20px;
`

export const FilterContainer = styled.ScrollView`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
`

export const BorderBottom = styled.View`
  margin-top: 3px;
  width: 36px;
  border-width: 3px;
  border-radius: 6px;
  border-color: #c1c1c1;
`

export const Numbers = styled.ScrollView`
  flex: 1;
`

export const NumbersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 7.5px 25px 7.5px;
`
export const Number = styled.TouchableOpacity<NumberProps>`
  flex-direction: row;
  background-color: ${props => props.bgColor};
  margin: 10px 5px;
  width: 59px;
  height: 59px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`
