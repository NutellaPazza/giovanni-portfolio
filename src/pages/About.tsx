import { PageHead } from "../components/PageHead";

const hobbies = [
  {
    title: "Stories, cinema, comics, manga, anime, and games",
    image: "/about-mountain-original.jpg",
    alt: "Giovanni De Stasio on a mountain summit",
    description:
      "I love cinema, and more broadly I love stories: fiction, true stories, imagined worlds, dragons, superheroes, manga, anime, comics, videogames, everything that lets a person enter another life for a while. Some people would call that nerdy. That is fine with me. If loving what I see as beauty and art makes me a nerd, then I would rather be the biggest nerd in history. Games belong to that same instinct for me: competitive, single-player, multiplayer. They are not an escape from life; they are a way of wanting to live more than one life. Super Smash Bros was a big part of my childhood, and I also played competitive tournaments when I was younger.",
  },
  {
    title: "Travel, mountains, sea, drawing, and sport",
    image: "/about-desert-horse-giovanni.jpg",
    alt: "Giovanni De Stasio riding a horse in the desert",
    description:
      "One of my biggest dreams is to visit every country in the world: every culture, every food, every place that changes the way I look at things. I know it will take time, money, and trade-offs, but it is one of the things I want most. I also love drawing, skiing, hiking, being on a boat, swimming, and diving. That is the version of myself I want to keep building: curious, restless, and close to the things that make life feel larger.",
  },
];

export function About() {
  return (
    <>
      <PageHead
        code="BIO"
        title="The person behind the numbers"
        lede="Curious, restless and close to the things that make life feel larger. This is the part of me a CV leaves out."
      />

      <section className="band">
        <div className="wrap story">
          <div>
            <p className="label">My story</p>
            <h2 style={{ marginTop: 14 }}>A life led by dreams that kept changing shape.</h2>
          </div>
          <div className="prose">
            <p>
              Since I was a child, I have always wanted to do something meaningful. More than that, I have always wanted to
              live with dreams and passions, even when those dreams changed over time.
            </p>
            <p>
              When I was little, I wanted to become a mad scientist. Later, as I started studying physics, I imagined myself
              following that path more seriously. Then I became interested in finance and economics, and I chose to move in
              that direction without really knowing whether it would be the road that would help me build the life I had in
              mind.
            </p>
            <p>
              I still do not know that for sure. I think life has to be lived fully, not passively, but with awareness of the
              choices we make and the consequences they create. Without that, there is no future worth building.
            </p>
          </div>
        </div>
      </section>

      <section className="band band--tint">
        <div className="wrap">
          <div className="band-head">
            <div>
              <p className="label">Passions and hobbies</p>
              <h2>The worlds I like to live through</h2>
            </div>
          </div>
          {hobbies.map((hobby, index) => (
            <article className={index % 2 ? "hobby hobby--flip" : "hobby"} key={hobby.title}>
              <figure>
                <img src={hobby.image} alt={hobby.alt} loading="lazy" />
              </figure>
              <div>
                <p className="label">{String(index + 1).padStart(2, "0")}</p>
                <h3>{hobby.title}</h3>
                <p>{hobby.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
