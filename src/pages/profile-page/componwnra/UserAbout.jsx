import Show from '../../components/show/Show'

export default function UserAbout({ about, skills }) {
    return (
        <section className="about-section">
            <p className="about">{about}</p>
            <div className="user-skills">
                <Show when={false && skills.length !== 0}>
                    <h2>Skills</h2>
                    <ul className="user-skills">
                        {
                            skills.map((skill, idx) => <li key={idx} className='skill'>{skill.technology_name}</li>)
                        }
                    </ul>
                </Show>
            </div>

        </section>
    )
}