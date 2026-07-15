export function Footer() {

  const date = new Date();
  const currentDate = date.getFullYear();

  return (
    <footer>
      <p>Copyright &copy; {currentDate} </p>
    </footer>
  )
}