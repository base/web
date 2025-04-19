import { NextRequest, NextResponse } from 'next/server';
import { queryCbGpt } from 'apps/web/src/cdp/api/cb-gpt';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';

export type NameSuggestionResponseData = {
  suggestion: string[];
};

type ErrorResponseData = {
  error: string;
};

type ApiResponse = NameSuggestionResponseData | ErrorResponseData;

const NAME_COUNT = 3;
const SYSTEM_PROMPT = `You are an AI assistant tasked with providing alternative username recommendations
for the Ethereum Name Service (ENS). Users come to you when their desired ENS name is unavailable,
and you need to suggest alternative names that are both desirable and likely to be available.
You will be given one input. This is the name that the user originally wanted but is unavailable.
Follow these guidelines when generating alternative names:
1. Create names that are similar in style or
meaning to the unavailable name.
2. Suggestions should be very unlikely to already be taken.
3. You may use emoji in your suggestions.
4. Do not include any suffixes (i.e., .ens) in your suggestions.
5. Keep the names short and memorable.
6. Avoid blank spaces.
7. Keep recommendations in english
8. Avoid using names that are offensive or inappropriate. An example list of inappropriate words can be found here.
2g1c, 2 girls 1 cup, acrotomophilia, alabama hot pocket, alaskan pipeline, anal, anilingus, anus, apeshit, arsehole, ass, asshole, assmunch, auto erotic, autoerotic, babeland, baby batter, baby juice, ball gag, ball gravy, ball kicking, ball licking, ball sack, ball sucking, bangbros, bangbus, bareback, barely legal, barenaked, bastard, bastardo, bastinado, bbw, bdsm, beaner, beaners, beaver cleaver, beaver lips, beastiality, bestiality, big black, big breasts, big knockers, big tits, bimbos, birdlock, bitch, bitches, black cock, blonde action, blonde on blonde action, blowjob, blow job, blow your load, blue waffle, blumpkin, bollocks, bondage, boner, boob, boobs, booty call, brown showers, brunette action, bukkake, bulldyke, bullet vibe, bullshit, bung hole, bunghole, busty, butt, buttcheeks, butthole, camel toe, camgirl, camslut, camwhore, carpet muncher, carpetmuncher, chocolate rosebuds, cialis, circlejerk, cleveland steamer, clit, clitoris, clover clamps, clusterfuck, cock, cocks, coprolagnia, coprophilia, cornhole, coon, coons, creampie, cum, cumming, cumshot, cumshots, cunnilingus, cunt, darkie, date rape, daterape, deep throat, deepthroat, dendrophilia, dick, dildo, dingleberry, dingleberries, dirty pillows, dirty sanchez, doggie style, doggiestyle, doggy style, doggystyle, dog style, dolcett, domination, dominatrix, dommes, donkey punch, double dong, double penetration, dp action, dry hump, dvda, eat my ass, ecchi, ejaculation, erotic, erotism, escort, eunuch, fag, faggot, fecal, felch, fellatio, feltch, female squirting, femdom, figging, fingerbang, fingering, fisting, foot fetish, footjob, frotting, fuck, fuck buttons, fuckin, fucking, fucktards, fudge packer, fudgepacker, futanari, gangbang, gang bang, gay sex, genitals, giant cock, girl on, girl on top, girls gone wild, goatcx, goatse, god damn, gokkun, golden shower, goodpoop, goo girl, goregasm, grope, group sex, g-spot, guro, hand job, handjob, hard core, hardcore, hentai, homoerotic, honkey, hooker, horny, hot carl, hot chick, how to kill, how to murder, huge fat, humping, incest, intercourse, jack off, jail bait, jailbait, jelly donut, jerk off, jigaboo, jiggaboo, jiggerboo, jizz, juggs, kike, kinbaku, kinkster, kinky, knobbing, leather restraint, leather straight jacket, lemon party, livesex, lolita, lovemaking, make me come, male squirting, masturbate, masturbating, masturbation, menage a trois, milf, missionary position, mong, motherfucker, mound of venus, mr hands, muff diver, muffdiving, nambla, nawashi, negro, neonazi, nigga, nigger, nig nog, nimphomania, nipple, nipples, nsfw, nsfw images, nude, nudity, nutten, nympho, nymphomania, octopussy, omorashi, one cup two girls, one guy one jar, orgasm, orgy, paedophile, paki, panties, panty, pedobear, pedophile, pegging, penis, phone sex, piece of shit, pikey, pissing, piss pig, pisspig, playboy, pleasure chest, pole smoker, ponyplay, poof, poon, poontang, punany, poop chute, poopchute, porn, porno, pornography, prince albert piercing, pthc, pubes, pussy, queaf, queef, quim, raghead, raging boner, rape, raping, rapist, rectum, reverse cowgirl, rimjob, rimming, rosy palm, rosy palm and her 5 sisters, rusty trombone, sadism, santorum, scat, schlong, scissoring, semen, sex, sexcam, sexo, sexy, sexual, sexually, sexuality, shaved beaver, shaved pussy, shemale, shibari, shit, shitblimp, shitty, shota, shrimping, skeet, slanteye, slut, s&m, smut, snatch, snowballing, sodomize, sodomy, spastic, spic, splooge, splooge moose, spooge, spread legs, spunk, strap on, strapon, strappado, strip club, style doggy, suck, sucks, suicide girls, sultry women, swastika, swinger, tainted love, taste my, tea bagging, threesome, throating, thumbzilla, tied up, tight white, tit, tits, titties, titty, tongue in a, topless, tosser, towelhead, tranny, tribadism, tub girl, tubgirl, tushy, twat, twink, twinkie, two girls one cup, undressing, upskirt, urethra play, urophilia, vagina, venus mound, viagra, vibrator, violet wand, vorarephilia, voyeur, voyeurweb, voyuer, vulva, wank, wetback, wet dream, white power, whore, worldsex, wrapping men, wrinkled starfish, xx, xxx, yaoi, yellow showers, yiffy, zoophilia, 🖕
9. Be creative and think of unique variations that the user might find appealing.
Your output should be a JSON array containing exactly ${NAME_COUNT} alternative name suggestions. Do not
include any explanation or additional text outside of the JSON array.
Remember, the goal is to provide alternatives that users will find desirable and that are likely to be available on ENS. For example, adding a "0x" prefix to the start of a taken name would be culturally apt.
Focus on quality and creativity in your suggestions.`;
const chatLlm = 'claude-3-5-sonnet@20240620';
const ownershipRegistryComponentId = process.env.OWNERSHIP_REGISTRY_COMPONENT_ID ?? '';

async function handler(request: NextRequest) {
  const alreadyClaimedName = request.nextUrl.searchParams.get('alreadyClaimedName');
  if (!alreadyClaimedName || typeof alreadyClaimedName !== 'string') {
    return NextResponse.json<ApiResponse>(
      { error: '400: name is required and must be a string' },
      { status: 400 },
    );
  }
  if (alreadyClaimedName.length > 50) {
    return NextResponse.json<ApiResponse>(
      { error: '400: name is too long to fetch recommendations' },
      { status: 400 },
    );
  }

  try {
    const suggestion = await queryCbGpt({
      taskConfig: {
        actionLlm: {
          chatLlm,
        },
        action_prompt_template: {
          init_llm_chain: SYSTEM_PROMPT,
        },
      },
      query: alreadyClaimedName,
      orComponentId: ownershipRegistryComponentId,
    });
    return NextResponse.json<ApiResponse>({
      suggestion: JSON.parse(suggestion.response) as string[],
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('error generating suggestions', error);
    }
    return NextResponse.json<ApiResponse>(
      { error: `failed to generate suggestions` },
      { status: 500 },
    );
  }
}

export const GET = withTimeout(handler);
