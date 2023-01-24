import { render,screen,renderHook, act } from '@testing-library/react'
import { AppTitleBox } from "components/AppBar/AppTitleBox";

describe('AppTitleBox test', () => {
  test('set AppTitle test',() =>{
    render(<AppTitleBox AppTitle='TitleTest' />)
    expect(screen.getByText('TitleTest')).toBeInTheDocument()
  })
});