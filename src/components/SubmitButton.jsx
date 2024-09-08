// import './../componentcss/SubmitButton.css'

export default function SubmitButton({handleSubmit}){

    return(
        <>
            <button onClick={handleSubmit} className="button-submit">Submit</button>
        </>
    )
}