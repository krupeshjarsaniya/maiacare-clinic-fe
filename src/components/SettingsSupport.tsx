import React, { useState } from "react";
import Image from "next/image";
import { Accordion, Col, Row } from "react-bootstrap";
import ContentContainer from "./ui/ContentContainer";
import headphoneImg from "@/assets/images/headphone.png";
import { MdOutlineMail } from "react-icons/md";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
const supportFaqs = [
  {
    title: "How do I know which fertility treatment is right for me?",
    desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number.",
  },
  {
    title: "How do I know which fertility treatment is right for me?",
    desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number.",
  },
  {
    title: "How do I know which fertility treatment is right for me?",
    desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number.",
  },
  {
    title: "How do I know which fertility treatment is right for me?",
    desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number.",
  },
];

const SettingsSupport = () => {
  const [activeKey, setActiveKey] = useState<string | null>("0");

  const handleSelect = (
    eventKey: AccordionEventKey,
     _e?: React.SyntheticEvent<unknown>
  ) => {
    setActiveKey(eventKey?.toString() ?? null);
  };
  return (
    <>
      <ContentContainer>
        <div className="d-flex justify-content-start align-items-center gap-3">
          <Image src={headphoneImg} width={48} height={48} alt="password-img" />

          <span className="accordion-title">Support</span>
        </div>

        <p className="settings-accordion-subtitle mt-lg-4 mt-3">
          Everything you need to know about the software and get help
        </p>

        <Row className="mt-lg-4 mt-0 g-lg-4 g-3">
          <Col xl="4" lg="5">
            <div className="faqs-secation">
              <h6 className="support-faqs-title">FAQs</h6>
              <p className="support-faqs-desc">
                Everything you need to know about the software and billing. Cant
                find answers you’re looking for? Please contact us on the phone
                number or on our email.
              </p>

              <div className="mt-4 d-flex flex-column gap-3">
                <div className="d-flex gap-2">
                  <div className="support-contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M15.8112 13.9495C15.9151 13.8803 16.0346 13.8382 16.1588 13.8269C16.2831 13.8156 16.4082 13.8355 16.5228 13.8848L20.944 15.8657C21.093 15.9294 21.2174 16.0396 21.2985 16.1799C21.3796 16.3202 21.4132 16.4829 21.394 16.6438C21.2484 17.7323 20.7124 18.7309 19.8857 19.4537C19.059 20.1766 17.9978 20.5747 16.8997 20.5738C13.5182 20.5738 10.2751 19.2305 7.88405 16.8394C5.49296 14.4484 4.14966 11.2053 4.14966 7.82383C4.14882 6.72565 4.54686 5.66453 5.26975 4.83783C5.99264 4.01113 6.99118 3.47511 8.07966 3.32946C8.24057 3.31034 8.40334 3.34385 8.54361 3.42497C8.68388 3.50609 8.7941 3.63046 8.85779 3.77946L10.8387 8.20446C10.8874 8.31811 10.9072 8.44203 10.8964 8.56519C10.8856 8.68836 10.8445 8.80694 10.7768 8.91039L8.77341 11.2926C8.70234 11.3998 8.66032 11.5237 8.65145 11.652C8.64257 11.7803 8.66715 11.9088 8.72278 12.0248C9.4981 13.612 11.1387 15.2329 12.7306 16.0007C12.8472 16.0561 12.9762 16.0801 13.105 16.0704C13.2337 16.0607 13.3577 16.0176 13.4647 15.9454L15.8112 13.9495Z"
                        stroke="#343330"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="contact-detail m-0">+9999999999</p>
                </div>

                <div className="d-flex gap-2">
                  <div className="support-contact-icon">
                    <MdOutlineMail />
                  </div>

                  <p className="contact-detail m-0">
                    maiacare.support@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xl="8" lg="7">
            <Accordion
              defaultActiveKey="0"
              activeKey={activeKey}
              onSelect={(eventKey, e) => handleSelect(eventKey, e)}
            >
              {supportFaqs.map((item, index) => {
                const currentKey = index.toString();
                const isOpen = activeKey === currentKey;

                return (
                  <Accordion.Item
                    eventKey={currentKey}
                    key={index}
                    className={`support-accordion-item mb-3 ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <Accordion.Header className="support-accordion-header">
                      <div className="support-accordion-header">
                        {item.title}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="support-accordion-content p-0">
                      {item.desc}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Col>
        </Row>
      </ContentContainer>
    </>
  );
};

export default SettingsSupport;
