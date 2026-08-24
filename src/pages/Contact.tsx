import Markdown from "react-markdown";

export default function Contact() {
    return (
        <section className="page page--contact">
            <div className="contact">
                <h1 className="contact__headline">About</h1>
                <h2 className="contact__subheadline">Multimedia Production & Journalismus</h2>


                <div className="contact__content">
                    <div className="contact__left">
                        <img src="scss/assets/Magali_About.png" alt="Magali Egger" />
                    </div>

                    <div className="contact__right">
                        <Markdown>{"Weisst du, was der Euro, „My Name Is“ von Eminem und ich gemeinsam haben? Wir teilen den gleichen Jahrgang: 1999. Als richtiges 90s Baby bin ich somit Teil der GenZ und in der Multimedialen Welt mehr als Zuhause. Aber back to the beginning: Hey, ich bin Magali! Oder auch rasende Reporterin, Pinterest-Liebhaberin, Multimedia Producerin – und, wenn’s drauf ankommt, Katzenflüsterin."}</Markdown>

                        <h3>Was mich antreibt</h3>

                        <Markdown>{"Ich bin aus vollem Herzen Journalistin und Multimedia Producerin. Geschichten erzählen, Emotionen wecken – und das mit Video und Sound? Genau mein Ding! Beim Schreiben für Onlinezeitungen habe ich gelernt, schnell und präzise zu formulieren. Beim Radio X und in Podcasts entdeckte ich die Kraft des Hörens. Meine Videokompetenzen entwickelte ich bei SRF Kulturplatz und SRF Kultur Instagram, wo ich Formate für verschiedene Zielgruppen und Plattformen umsetzte. Als Digital Content Producerin im Migros Museum für Gegenwartskunst tauchte ich zusätzlich in die Welt der PR- und Newsletter-Kommunikation ein – und das auf Deutsch und Englisch. Dabei verknüpfe ich kreative Ideen mit fundierten Performanceanalysen, optimiere Inhalte datenbasiert und entwickle sie strategisch weiter. Ob Post, Reel oder Kampagne – ich denke in Stories, Plattformen und Wirkung."}</Markdown>

                        <h3>Hard Facts – in Kürze</h3>

                        <Markdown>{[
                            "Ausbildung: MA Multimedial Communication & Publishing, BSc Media Engineering / Multimedia Production mit Joint Degree am MAZ (FH Graubünden & HKB, 2024)",
                            "Minors: Social Media im Journalismus & Agenturen, Projektmanagement, Creative Writing, Datenjournalismus",
                            "Beruflich: Content Producerin & freie Journalistin (u. a. Null41, SRF)",
                            "Stimme: Auf B-Sounds auf Radio X zu hören",
                        ].join("\n\n")}</Markdown>

                        <h3>Und sonst so?</h3>

                        <Markdown>{"Neben meinem Berufsalltag bin ich Fan von Kultur, Gesellschaftsthemen und Politik – und zu fast 100 Prozent überzeugt, dass die tiefsten Wahrheiten in den simpelsten Pop-Lyrics stecken. An einem Samstagnachmittag findest du mich deshalb entweder im Kunstmuseum, in einem Café beim „Übers-Leben-diskutieren“ oder in meinem favourite Pilatesstudio – weil Balance bekanntlich alles ist."}</Markdown>
                    </div>
                </div>
                <Markdown>{"Viel Spass beim Erkunden meiner Arbeiten – und beim Kennenlernen von Magali Egger."}</Markdown>
            </div>
        </section>
  )
}
