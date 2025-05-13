import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export async function WhatsIncluded() {
  return (
    <Container>
      <div className="flex w-full flex-col space-y-20 bg-black py-12">
        <div className="grid grid-cols-2">
          <Title level={TitleLevel.Display3}>What&apos;s included?</Title>

          <div className="text-md font-sans text-white">
            <p className="font-bold">Base Learn Curriculum</p>
            <p>
              Participants will work through the{' '}
              <a href="https://docs.base.org/learn/welcome/">Base Learn</a> content, which
              is publicly available. However, as part of the Base Bootcamp program, they will also
              have access to supplemental resources and graded projects, reviewed by Coinbase
              engineers.
            </p>
            <br />
            <p className="font-bold">Mentors</p>
            <p>Each student is paired with a mentor whom you will meet with once a week.</p>
            <br />
            <p className="font-bold">Office Hours</p>
            <p>
              Base Bootcamp staff will host regular open office hours via Google Meet to answer
              questions.
            </p>
            <br />
            <p className="font-bold">Discord</p>
            <p>
              All students will have access to a private channel in the Base Discord where they can
              interact with Coinbase staff, mentors and other Base Bootcamp students.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
