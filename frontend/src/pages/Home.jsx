import { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';

function Home() {
	const [notes, setNotes] = useState([]);
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = () => {
		api.get('/api/notes/')
			.then((res) => res.data)
			.then((data) => {
				setNotes(data);
				console.log(data);
			})
			.catch((err) => alert(err));
	};

	const deleteNotes = (id) => {
		api.delete(`/api/notes/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert('Note Deleted!');
				else alert('failed to delete note. ');
			})
			.catch((error) => alert(error));
		getNotes();
	};

	const createNote = (e) => {
		e.preventDefault();
		api.post('/api/notes/', { content, title })
			.then((res) => {
				if (res.status === 201) alert('note created');
				else alert('failed to make note.');
                getNotes();
			})
			.catch((error) => alert(error));
	};

	return (
		<div>
			<div>
				<h2>Notes</h2>

                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNotes} key={note.id} />
                ))}
                
			</div>

			<h2>Create Note</h2>
			<form onSubmit={createNote}>
				<label htmlFor="title"></label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="content"></label>
				<br />
				<br />
                
				<textarea
					name="content"
					id="content"
					cols="30"
					rows="10"
					required
					onChange={(e) => setContent(e.target.value)}
				></textarea>
                <br />
				<br />

                <input type="submit" value="Submit"/>
			</form>
		</div>
	);
}
export default Home;
