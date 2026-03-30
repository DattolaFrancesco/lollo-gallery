 <div
        ref={menuRef}
        className=" flex gap-0.5  absolute left-[50%]  top-[90%] -translate-1/2 m-2 w-[600] min-h-[60] z-999999999999 fixed top-0 generic1sTransition"
      >
        {/* logo */}
        <div className=" w-[15%] bg-white hover:bg-gray-200 flex justify-center items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
            }}
            className="cursor-pointer"
          >
            <RecallMemoryForm className="w-full h-auto p-1" />
          </button>
        </div>
        {/* fine logo */}
        {/* inizio btn */}
        <div className=" w-[35%] flex flex-col gap-0.5 ">
          <div className="flex justify-between bg-white">
            <p className="text-xs p-1">Visualization</p>
            <div className="flex p-1.5">
              <button
                ref={btnShuffleRef}
                onClick={() => {
                  Grid();
                }}
                className="text-xs text-white hover:bg-gray-300  bg-gray-200 p-1 activeBtn cursor-pointer"
              >
                Shuffle
              </button>
              <button
                ref={btnGridRef}
                onClick={(e) => {
                  e.stopPropagation();
                  Grid();
                }}
                className="text-xs text-white hover:bg-gray-300 bg-gray-200 p-1 cursor-pointer"
              >
                Grid
              </button>
            </div>
          </div>
          <div className="bg-white hover:bg-gray-200">
            <a href="https://www.instagram.com/lollochef_/">
              <p className="text-xs px-1">Archive by Lorenzo Accorti</p>
            </a>
          </div>
          <div className="bg-white hover:bg-gray-200">
            <a href="https://www.instagram.com/francescodattola_/">
              <p className="text-xs px-1">Developed by Francesco Dattola</p>
            </a>
          </div>
        </div>
        {/* fine btn */}
        {/* inizio shuffle */}
        <div className="bg-white hover:bg-gray-200 w-[5%] flex items-center justify-center flex-col">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (gridedRef.current)
                Grid(); //mixArray(gallery, descriptionPhotos);
              else shuffle();
            }}
            className="-rotate-90 p-1"
          >
            <p className="text-sm text-nowrap cursor-pointer">Shuffle &nbsp;● </p>
          </button>
        </div>
        {/* fine shuffle */}
        {/* inizio descrizione */}
        <div className="w-[30%] bg-white">
          <p className="text-xs p-1">Lorenzo Accorti discomposed archive, to recall memory form. Lorenzo Accorti discomposed archive, to recall memory form.</p>
        </div>
        {/* fine descrizione */}
  
      </div>