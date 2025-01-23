"use client";

import Footer from "@/components/Footer";
import MainHeaders from "@/components/MainHeaders";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function FrequentlyAskedQuetions() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 font-sans">
        <MainHeaders title="자주 묻는 질문" backIcon />
        <Accordion.Root type="multiple" className="mb-4">
          {[
            {
              id: "FAQ-1",
              title: "예약확인은 어떻게 하나요?",
              content:
                '예약은 마이페이지 내 "예약내역"에서 확인할 수 있습니다. 예약내역에서 과거내역부터 실시간으로 예약한 내역을 확인할 수 있으며, 상세보기를 통해 숙소 정보 및 결제 수단을 확인할 수 있습니다.',
            },
            {
              id: "FAQ-2",
              title: "예약 대기 건 예약취소하고 싶어요.",
              content:
                '예약 대기 중인 건에 대한 취소는 마이페이지 내 "예약 대기 목록"에서 가능합니다. 해당 목록에서 예약 대기 상태를 확인하고, 취소 버튼을 클릭하면 예약이 취소됩니다. 대기 중인 예약이 취소될 경우, 다른 예약이 정상적으로 진행될 수 있도록 시스템에서 자동으로 처리됩니다.',
            },
            {
              id: "FAQ-3",
              title: "여러 개의 객실을 동시에 예약할 수 있나요?",
              content:
                "네, 여러 개의 객실을 동시에 예약하실 수 있습니다. 예약 시 원하는 숙소와 객실 수를 선택하신 후, 각 객실의 예약을 진행하시면 됩니다. 단, 객실 수와 숙소의 여유가 있는지 확인한 후 예약을 진행하실 수 있습니다. 다수의 객실을 예약할 경우, 객실 배정 및 결제 정보가 각각 안내되니 확인 부탁드립니다.",
            },
            {
              id: "FAQ-4",
              title: "예약취소했는데 언제 환불되나요?",
              content:
                "예약 취소 후 환불은 결제 수단에 따라 다르게 처리됩니다. 카드 결제의 경우, 취소 완료 후 3~7일 이내에 환불이 이루어집니다. 계좌 이체나 다른 결제 수단의 경우, 환불 처리 시간이 다를 수 있습니다. 환불 처리가 완료되면 이메일로 알림을 드리니, 확인해 주세요.",
            },
            {
              id: "FAQ-5",
              title: "금액이 실시간으로 변경되는 이유는 뭔가요?",
              content:
                "호텔 예약 금액은 실시간으로 변동할 수 있습니다. 이는 수요와 공급에 따라 가격이 다르게 책정되기 때문입니다. 예약 시점에 따라 객실의 가격이 변경될 수 있으며, 특히 특정 날짜나 시즌에는 가격이 급격히 변동할 수 있습니다. 또한, 프로모션이나 할인 조건에 따라 가격이 달라질 수 있습니다. 예약 전 가격을 다시 한번 확인해 주세요.",
            },
          ].map((term) => (
            <Accordion.Item key={term.id} value={term.id}>
              <Accordion.Header>
                <div className="my-2 flex h-12 w-full items-center justify-between rounded bg-[#F6F6F6] p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-black">{term.title}</span>
                  </div>
                  <Accordion.Trigger className="group flex cursor-pointer items-center border-none bg-transparent">
                    <ChevronDownIcon
                      className="size-4 text-black transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </div>
              </Accordion.Header>
              <Accordion.Content className="rounded bg-[#F6F6F6] p-3 text-sm text-gray-700">
                {term.content}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <Footer />
      </div>
    </div>
  );
}
