export const ModalButton = () => {
  return (
    // fixed right-0 bottom-0 z-100 m-5 h-[48px] w-[48px] bg-cover bg-center bg-no-repeat
    <div
      className="fixed right-2 bottom-2 z-500 h-[56px] w-[56px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${chrome.runtime.getURL('/assets/popup_getToken.png')})` }}
    ></div>
  )
}
