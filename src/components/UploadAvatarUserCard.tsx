import { CardContent, Grid, CardMedia } from "@material-ui/core"
import * as React from "react"
import { useState } from "react"

interface uploadProps {
  upload: (img: FormData) => void
}

export const UploadAvatarUserCard = (props: uploadProps) => {
  const [file, setFile] = useState<any>()

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files)
    setFile(e.target.files)
  }
  return (
    <CardContent>
      <Grid container justify="center" alignItems="center">
        <input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange} />
      </Grid>

      <CardMedia image={file} title="Contemplative Reptile" />
    </CardContent>
  )
}
