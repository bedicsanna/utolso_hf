import { useSelector } from "react-redux";

export const HistoryComponent = () => {
	const {currentValue, currentExpression, history, editorMode} = useSelector(state => state.calculator)
    return (
        <div className="history-component">
            <p>Aktuális:</p>
            <table className="current history">
				<tbody>
					<tr>
						<td>{currentExpression.join(" ")}</td>
					</tr>
				</tbody>
            </table>

            <p>Eddigi számítások:</p>
            <table className="history">
				<tbody>
					{history.map(e => 
						<tr key={e}>
							<td>{e}</td>
						</tr>
					)}
				</tbody>
            </table>
        </div>
    )

};
