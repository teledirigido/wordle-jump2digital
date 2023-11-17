

function Word(props) {

  const { word } = props;

  return (
    <>
    <div className="word">
      {
      [...Array(5)].map( (item, index) => {

        const letter = word.content[index] ? word.content[index] : " ";

        return (
          <div className={`letter letter-${word.status[index]}`} key={index}>
            { letter }
          </div>
        )
      })
      }
    </div>
    </>
  )
}

export default Word