import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  iconTitle?: string;
  title?: string;
  titleChildren?: React.ReactNode;
  classNameTitle?: string;
  width: string;
  onClose: (e: boolean) => void;
  close?: boolean;
  iconColorXmark?: string;
  classNameContainerTitle?: string;
  isStatic?: boolean;
}

export default function Modal({
  isStatic = true,
  isOpen,
  children,
  iconTitle,
  title = "",
  titleChildren,
  classNameTitle = "",
  classNameContainerTitle = "",
  width = "max-w-4xl",
  onClose,
  close = true,
  iconColorXmark = "hover:text-opacity-50 text-white",
}: Props) {
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          static={isStatic}
          as="div"
          className="relative z-50"
          onClose={(val) => (!isStatic ? onClose(val) : null)}
        >
          <Transition
            as={Fragment}
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 bg-opacity-25" />
          </Transition>
          <div className="fixed inset-0 overflow-y-auto font-thSarabun">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition
                as={Fragment}
                show={isOpen}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  id="list-data"
                  className={`${width} min-h-80 w-full transform bg-white rounded-3xl text-left align-middle transition-all mt-2`}
                >
                  <DialogTitle
                    as="h3"
                    className={`${classNameContainerTitle} leading-6 text-black flex items-center justify-between bg-white bg-opacity-70 rounded-tl-[20px] rounded-tr-[20px] pt-5 border-b border-black mx-6 pb-2`}
                  >
                    <div className={`${classNameTitle} flex items-center space-x-2`}>
                      {iconTitle ? <i className={`text-xl ${iconTitle}`}></i> : null}
                      {title ? <p className="text-xl font-semibold cursor-default">{title}</p> : null}
                      {titleChildren ? titleChildren : null}
                    </div>
                    <div className="-mt-1 -mr-1 sm:ml-0 ml-auto">
                      <span className={`tooltip-icon`}>
                        <button
                          className={`${!close ? "hidden" : ""} cursor-pointer min-w-auto w-6 h-6 rounded-full font-normal`}
                          onClick={() => onClose(false)}
                        >
                          <i className={`fa-solid fa-xmark text-xl !text-black ${iconColorXmark}`} />
                        </button>
                      </span>
                    </div>
                  </DialogTitle>
                  <div className="py-6 px-10">{children}</div>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}